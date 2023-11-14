import { useModal } from '~/store/modal/hooks'
import { useState } from 'react'
import iaxios from '~/utils/axios'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'


function SahreFileModal({ closeModal }) {
    const modal = useModal()
    const [user, setUser] = useState('');
    const [canView, setCanView] = useState(false);
    const [canComment, setCanComment] = useState(false);
    const authUser = useSelector(state => state.auth.user);



    const handleFileUpload = (e) => {
        e.preventDefault()
        if (!user) {
            toast.error('Please enter a valid email')   
            return
        }
        if (user === authUser.email) {
            toast.error('You cannot share with yourself')
            return
        }

        iaxios.post(`file/${modal.data.fileId}/share/?email=${user}`, {
            can_view: canView,
            can_comment: canComment,
        }).then(() => {
            toast.success('File successfully shared with ' + user)
            closeModal()

        }).catch((err) => {
            toast.error(err.response.data.detail)
        })
    }

    return (
        <div className='p-4'>
            <form className='flex flex-col gap-3'>
                <input type="text" value={user} className='border-2 rounded p-2 w-full' onChange={(e) => setUser(e.target.value)} placeholder='name@company.com' />
                <div className='flex gap-1 items-center'>
                    <input type="checkbox" id="can_view" onChange={() =>setCanView(!canView)} />
                    <label htmlFor="can_view">Can view</label>
                </div>
                <div className='flex gap-1 items-center'>
                    <input type="checkbox" id="can_comment" onChange={() =>setCanComment(!canComment)} />
                    <label htmlFor="can_comment">Can comment</label>
                </div>
                <button
                    className='bg-blue-500 px-3 py-2 rounded text-white'
                    onClick={handleFileUpload} >
                    Share
                </button>
            </form>
        </div>
    )
}

SahreFileModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default SahreFileModal