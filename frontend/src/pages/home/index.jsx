import iaxios from '~/utils/axios'
import { useEffect, useState } from 'react'
import File from '~/components/file'
import { useSelector } from 'react-redux'

function Home() {
    const [files, setFiles] = useState([])
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        iaxios.get('file/list/').then(res => {
            setFiles(res.data)
        })
    }, [])


    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">File List</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">File name</th>
                            <th scope="col" className="px-6 py-3">Owner</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Upload Date</th>
                            <th scope="col" className="px-6 py-3">Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <File key={file.id} file={file} user_id={user.id}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home