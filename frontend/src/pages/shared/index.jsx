import iaxios from '~/utils/axios'
import { useEffect, useState } from 'react'
import File from '~/components/file'
import { useSelector } from 'react-redux'
import { setModal } from '~/store/modal/actions'

function SharedFile() {
    const [files, setFiles] = useState([])
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        iaxios.get('file/list/').then(res => {
            setFiles(res.data)
        })
    }, [])


    return (
        <div className="container mx-auto">
            {files.length > 0 ? (
                <>
                    <div className='flex justify-between mb-8'>
                        <h1 className="text-2xl font-bold mb-4 text-slate-500">File List</h1>
                        <button
                            className='border rounded px-6 py-2 bg-green-500 text-white'
                            onClick={() => setModal('addFile', { modalTitle: 'Add file', setFiles: setFiles })}>
                            Add file
                        </button>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">File name</th>
                                    <th scope="col" className="px-6 py-3">Shared with</th>
                                    <th scope="col" className="px-6 py-3 flex justify-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file) => (
                                    <File key={file.id} file={file} user_id={user.id} setFiles={setFiles}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>) : (
                <div >
                    <button
                        className='border rounded px-6 py-2 bg-green-500 text-white'
                        onClick={() => setModal('addFile', { modalTitle: 'Upload file', setFiles: setFiles })}>
                        Upload file
                    </button>
                </div>
            )
            }
        </div>
    )
}

export default SharedFile