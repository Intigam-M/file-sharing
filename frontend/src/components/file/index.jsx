import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

function File({ file, user_id }) {
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
        </tr>

    )
}

File.propTypes = {
    file: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        upload_date: PropTypes.string.isRequired,
        expiration_date: PropTypes.string.isRequired,
        uploader: PropTypes.shape({
            id: PropTypes.number.isRequired,
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,

    user_id: PropTypes.number.isRequired,
}



export default File