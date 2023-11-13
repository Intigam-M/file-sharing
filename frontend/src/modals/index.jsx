import modals from "~/routes/modals";
import { useModal } from "~/store/modal/hooks";
import { removeModal } from "~/store/modal/actions";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal() {
  const modal = useModal();
  const currentModal = modals.find((m) => m.name === modal.name);

  const closeModal = () => {
    removeModal();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-60" onClick={closeModal}>
      <div className="w-4/12  overflow-auto rounded bg-white" onClick={stopPropagation} >
        <div className="border-b">
          <div className="flex justify-between items-center px-4 py-2">
            <h2 className="text-xl font-bold text-slate-600">
              Update comment
            </h2>
            <button onClick={closeModal}>
              <AiOutlineClose className="text-xl" />
            </button>
          </div>
        </div>
        {currentModal && <currentModal.element closeModal={closeModal} />}
      </div>
    </div>
  );
}
