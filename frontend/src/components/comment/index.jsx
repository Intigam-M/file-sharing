import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import iaxios from '~/utils/axios';
import { setModal } from '~/store/modal/actions';

function Comment({ comments, comment, authUser, fileDetail, setComments }) {


    const deleteComment = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',

            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                iaxios.delete(`/file/comment/delete/${comments[comment].id}/`)
                    .then(() => {
                        toast.success('Comment deleted');
                        setComments((prevComments) => prevComments.filter((c) => c.id !== comments[comment].id));
                    })
            }
        })
    }

    return (
        <div className="border border-slate-400 p-3 mb-4 rounded-md shadow-md flex justify-between">
            <div className='flex gap-3 items-center'>
                <div className='bg-stone-200 rounded px-2 py-1 text-sm'>
                    <p>{comments[comment].author.first_name} {comments[comment].author.last_name}</p>
                    <p className='text-xs'>{new Date(comments[comment].timestamp).toDateString()}</p>
                </div>
                <p className='font-medium'>{comments[comment].content}</p>
            </div>
            <div className='flex gap-3'>
                {authUser.id === comments[comment].author.id && fileDetail?.share_data?.can_comment
                    && <button className='border rounded px-4 bg-blue-600 text-white'
                        onClick={() => setModal('UpdateComment', {comment_id:comments[comment].id, comment:comments[comment].content, setComments:setComments, modalTitle: 'Update comment' })}>Edit</button>}
                {
                    (authUser.id === comments[comment].author.id && fileDetail?.share_data?.can_comment || authUser.id === fileDetail.uploader.id)
                    && <button className='border rounded px-4 bg-red-600 text-white' onClick={deleteComment}>Delete</button>
                }
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    authUser: PropTypes.object.isRequired,
    fileDetail: PropTypes.object.isRequired,
    setComments: PropTypes.func.isRequired,
}


export default Comment