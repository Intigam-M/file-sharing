import Header from "~/layouts/header";
import PropTypes from "prop-types";
import { useModal } from "~/store/modal/hooks";
import Modal from "~/modals";

function MainLayout({ children }) {
    const modal = useModal()
    return (
        <div>
            {modal && <Modal />}
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default MainLayout