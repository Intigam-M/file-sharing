import UpdateCommentModal from "~/modals/updateComment";
import AddFileModal from "~/modals/addFile";
import SahreFileModal from "~/modals/shareFile";

const modals = [
	{
		name: 'UpdateComment',
		element: UpdateCommentModal
	},
    {
        name: 'addFile',
        element: AddFileModal
    },
    {
        name: 'shareFile',
        element: SahreFileModal
    },
]

export default modals