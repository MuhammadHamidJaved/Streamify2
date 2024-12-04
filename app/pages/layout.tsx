import React from 'react';
import NavBar from '../../components/Header/NavBar';
// import { SessionProvider } from '../../components/Context/SessionContext';

const Layout: React.FC = ({ children }:any) => {
    return (
        <div>
            {/* <SessionProvider> */}

            {/* <NavBar /> */}
            <main>
                {children}
            </main>
            {/* </SessionProvider> */}
            <footer>
                <p>&copy; 2023 Streamify. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;