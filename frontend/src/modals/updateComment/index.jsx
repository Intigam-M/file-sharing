import { useModal } from '~/store/modal/hooks'
import { useState } from 'react'
import iaxios from '~/utils/axios'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'


function UpdateCommentModal({closeModal}) {
    const modal = useModal()
    const [comment, setComment] = useState(modal.data.comment)


    const updateComment = (e) => {
        e.preventDefault()
        iaxios.put(`/file/comment/edit/${modal.data.comment_id}/`, { content: comment })
            .then(() => {
                modal.data.setComments((prevComments) => prevComments.map((c) => {
                    if (c.id === modal.data.comment_id) {
                        return { ...c, content: comment }
                    }
                    return c
                }))
                toast.success('Comment updated')
                closeModal()
            })
    }

    return (
        <div className='p-4'>
            <form className='flex gap-3'>
                <input type="text" value={comment} className='border-2 rounded p-2 w-full' onChange={(e) => setComment(e.target.value)} />
                <button
                    className='bg-blue-500 px-3 py-2 rounded text-white'
                    onClick={updateComment}>
                    Update
                </button>
            </form>
        </div>
    )
}

UpdateCommentModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default UpdateCommentModal