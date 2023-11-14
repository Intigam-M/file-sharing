import { useModal } from '~/store/modal/hooks'
import { useState } from 'react'
import iaxios from '~/utils/axios'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'



function AddFileModal({ closeModal }) {
    const modal = useModal()
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [description, setDescription] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile.name);
    };

    const handleFileUpload = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('file_data', file);
        formData.append('name', fileName);
        formData.append('description', description);

        iaxios.post('file/add/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        }).then(() => {
            iaxios.get('file/list/').then(res => {
                modal.data.setFiles(res.data)
            })

            toast.success('File uploaded successfully')
            closeModal()
        })
    }

    return (
        <div className='p-4'>
            <form className='flex flex-col gap-4'>
                <input type="file" onChange={handleFileChange} />
                <input type="text" value={description} className='border-2 rounded p-2 w-full' onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                <button
                    className='bg-blue-500 px-3 py-2 rounded text-white'
                    onClick={handleFileUpload} >
                    Upload
                </button>
            </form>
        </div>
    )
}

AddFileModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default AddFileModal