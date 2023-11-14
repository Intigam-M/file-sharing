import { setModal } from '~/store/modal/actions'
import toast from 'react-hot-toast'
import iaxios from '~/utils/axios'
import PropTypes from 'prop-types'

function SharedInfo({ data, setSharedData }) {

    const stopSharing = (id) => {
        iaxios.delete(`file/stop-sharing/${id}/`).then(() => {
            setSharedData((prevData) => prevData.filter(data => data.id !== id))
            toast.success('File sharing stopped')
        })
    }

    return (
        <tr className="border-b border-slate-300 hover:bg-slate-200 ">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                {data.file.name}
            </th>
            <td className="px-6 py-4">
                {data.shared_with.first_name + ' ' + data.shared_with.last_name}
            </td>
            <td className="px-6 py-4 flex justify-center gap-2">
                <button
                    className='border rounded px-4 bg-blue-500 text-white py-1'
                    onClick={() => setModal('shareFile', { modalTitle: 'Update share data', fileId: data.file.id, sharedData: data, setSharedData: setSharedData })}>
                    Update
                </button>

                <button
                    className='border rounded px-4 bg-red-500 text-white py-1'
                    onClick={() => stopSharing(data.id)}>
                    Stop sharing
                </button>
            </td>
        </tr>
    )
}

SharedInfo.propTypes = {
    data: PropTypes.object.isRequired,
    setSharedData: PropTypes.func.isRequired
}

export default SharedInfo