import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WebSocketInstance from '~/utils/webSocketConfig';
import { useSelector } from 'react-redux';
import iaxios from '~/utils/axios'

const FileDetail = () => {
    const { fileId } = useParams();
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [fileDetail, setFileDetail] = useState({});
    const userId = useSelector(state => state.auth.user.id);


    useEffect(() => {
        iaxios.get(`file/${fileId}/detail/`).then(res => {
            setFileDetail(res.data);
            setComments(res.data.comments);
        })
    }, []);


    useEffect(() => {
        const handleIncomingMessage = (event) => {
            const eventObj = JSON.parse(event.data);
            const newComment = eventObj.data.message;
            setComments((prevComments) => [newComment, ...prevComments])
        }

        WebSocketInstance.connect(`ws://localhost:8000/ws/file/${fileId}/comments/`);
        WebSocketInstance.handleIncomingMessage(handleIncomingMessage);

        return () => {
            WebSocketInstance.disconnect();
        }

    }, [fileId]);

    const sendComment = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;
        WebSocketInstance.sendMessage(JSON.stringify({ type: 'comment_message', data: { message: newComment, user_id: userId } }));
        setNewComment('');
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">File Detail</h2>
            <div className="border p-4 rounded-md shadow-md">
                <h3 className="text-xl font-bold mb-2">{fileDetail.name}</h3>
                <p className="text-sm mb-4">{fileDetail?.description}</p>
                <p className="text-sm mb-2">
                <strong>Uploader: </strong>
                    {fileDetail.uploader?.first_name} {fileDetail.uploader?.last_name}</p>
                <p className="text-sm mb-2"><strong>Upload Date:</strong> {new Date(fileDetail.upload_date).toDateString()}</p>
                <p className="text-sm mb-4"><strong>Expiration Date:</strong> {new Date(fileDetail.expiration_date).toDateString()}</p>
                <a href={fileDetail.file_data} className="text-blue-500 hover:underline block mb-4">View File</a>
                <h3 className="text-xl font-bold mb-2">Comments</h3>
                <form className='flex gap-3'>
                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} className='border flex-1 rounded p-3 mb-4' placeholder='Add comment' />
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded' onClick={sendComment}>Add Comment</button>
                    </div>
                </form>
                {Object.keys(comments).map((comment, index) => (
                    <div key={index} className="border p-3 mb-4 rounded-md shadow-md flex justify-between">
                        <p>{comments[comment].content}</p>
                        <div>
                            <p>{comments[comment].author.first_name} {comments[comment].author.last_name}</p>
                            <p className='text-xs'>{new Date(comments[comment].timestamp).toDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileDetail;
