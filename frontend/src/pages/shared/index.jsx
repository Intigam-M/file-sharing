import iaxios from '~/utils/axios'
import { useEffect, useState } from 'react'
import SharedInfo from '~/components/sharedInfo'

function SharedFile() {
    const [sharedData, setSharedData] = useState([])

    useEffect(() => {
        iaxios.get('file/shared-list/').then(res => {
            setSharedData(res.data)
        })
    }, [])

    return (
        <div className="container mx-auto">
            <div className='flex justify-between mb-8'>
                <h1 className="text-2xl font-bold mb-4 text-slate-500">Shared File List</h1>
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
                        {sharedData.map((data, index) =>
                            <SharedInfo key={index} data={data} setSharedData={setSharedData} />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SharedFile