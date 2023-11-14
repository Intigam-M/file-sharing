import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import iaxios from '~/utils/axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { setModal } from '~/store/modal/actions';

function File({ file, user_id, setFiles }) {

    const deleteFile = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this file!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#EF4444',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                iaxios.delete(`file/delete/${file.id}/`).then(() => {

                    toast.success('File deleted')

                    iaxios.get('file/list/').then(res => {
                        setFiles(res.data)
                    })
                }).catch(() => {
                    toast.error('An error occured')
                })
            }
        })
    }


    return (
        <tr className="border-b border-slate-300 hover:bg-slate-200 ">
            <th scope="row" className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap">
                <Link to={`/file/${file.id}`} key={file.id} className='cursor-pointer hover:text-blue-700'>
                    {file.name}
                </Link>
            </th>
            <td className="px-6 py-4">
                {file.uploader.id === user_id ? 'Owned by me' : file.uploader.first_name + ' ' + file.uploader.last_name}
            </td>
            <td className="px-6 py-4">
                {file.description}
            </td>
            <td className="px-6 py-4">
                {new Date(file.upload_date).toDateString()}
            </td>
            <td className="px-6 py-4">
                {new Date(file.expiration_date).toDateString()}
            </td>
            <td className="px-6 py-4">
                <div className='flex gap-2 justify-center'>
                    <button
                        className='border rounded px-4 bg-blue-500 text-white py-1'
                        onClick={()=>setModal('shareFile',{ modalTitle: 'Share file', fileId:file.id})}>
                        Share
                    </button>
                    <button
                        className='border rounded px-4 bg-red-500 text-white py-1'
                        onClick={deleteFile} >
                        Delete
                    </button>
                </div>
            </td>
        </tr>

    )
}

File.propTypes = {
    file: PropTypes.object.isRequired,
    user_id: PropTypes.number.isRequired,
    setFiles: PropTypes.func.isRequired,
}

export default File