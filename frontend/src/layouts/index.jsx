import Header from "~/layouts/header";
import PropTypes from "prop-types";

function MainLayout({ children }) {
    return (
        <div>
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