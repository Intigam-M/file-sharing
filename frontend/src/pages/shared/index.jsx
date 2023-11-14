import iaxios from '~/utils/axios'
import { useEffect, useState } from 'react'
import File from '~/components/file'
import { useSelector } from 'react-redux'
import { setModal } from '~/store/modal/actions'

function SharedFile() {
    const [sharedData, setSharedData] = useState([])
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        iaxios.get('file/shared-list/').then(res => {
            setSharedData(res.data)
            console.log(res.data)
        })
    }, [])

    const stopSharing = () => {
        iaxios.delete('file/stop-sharing/', { data: { file_id: 1 } }).then(res => {
            console.log(res.data)
        })
    }


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
                        {sharedData.map((data, index) => {
                            return (
                                <tr key={index} className="border-b border-slate-300 hover:bg-slate-200 ">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {data.file.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {data.shared_with.first_name + ' ' + data.shared_with.last_name}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-2">
                                        <button
                                            className='border rounded px-4 bg-blue-500 text-white py-1'
                                            onClick={()=>setModal('shareFile',{ modalTitle: 'Update share data', fileId:data.file.id, sharedData:data, setSharedData:setSharedData})}>
                                            Update
                                        </button>

                                        <button
                                            className='border rounded px-4 bg-red-500 text-white py-1'
                                            onClick={stopSharing}>
                                            Stop sharing
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SharedFile