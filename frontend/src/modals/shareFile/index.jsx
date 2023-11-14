import { useModal } from '~/store/modal/hooks'
import { useState } from 'react'
import iaxios from '~/utils/axios'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'


function SahreFileModal({ closeModal }) {
    const modal = useModal()
    const [user, setUser] = useState(modal.data.sharedData ? modal.data.sharedData.shared_with.email : '');
    const [canView, setCanView] = useState(modal.data.sharedData ? modal.data.sharedData.can_view : false);
    const [canComment, setCanComment] = useState(modal.data.sharedData ? modal.data.sharedData.can_comment : false);
    const authUser = useSelector(state => state.auth.user);

    const clickHandler = (e) => {
        e.preventDefault()
        if (!user) {
            toast.error('Please enter a valid email')
            return
        }
        if (user === authUser.email) {
            toast.error('You cannot share with yourself')
            return
        }
        if (modal.data.sharedData) {
            iaxios.put(`/file/update-shared-data/${modal.data.sharedData.id}/`, {
                can_view: canView,
                can_comment: canComment,
            }).then(() => {
                iaxios.get('file/shared-list/').then(res => {
                    modal.data.setSharedData(res.data)
                })
                toast.success('Share data successfully updated')
                closeModal()

            }).catch((err) => {
                toast.error(err.response.data.detail)
            })

        } else {
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
    }

    return (
        <div className='p-4'>
            <form className='flex flex-col gap-3'>
                <input
                    type="text"
                    disabled={modal.data.sharedData ? true : false}
                    value={user}
                    className='border-2 rounded p-2 w-full'
                    onChange={(e) => setUser(e.target.value)}
                    placeholder='name@company.com' />
                <div className='flex gap-1 items-center'>
                    <input type="checkbox" defaultValue={canView} checked={canView} id="can_view" onChange={() => setCanView(!canView)} />
                    <label htmlFor="can_view">Can view</label>
                </div>
                <div className='flex gap-1 items-center'>
                    <input type="checkbox" defaultValue={canComment} checked={canComment} id="can_comment" onChange={() => setCanComment(!canComment)} />
                    <label htmlFor="can_comment">Can comment</label>
                </div>
                <button
                    className='bg-blue-500 px-3 py-2 rounded text-white'
                    onClick={clickHandler} >
                    {modal.data.sharedData ? 'Update' : 'Share'}
                </button>
            </form>
        </div>
    )
}

SahreFileModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default SahreFileModal