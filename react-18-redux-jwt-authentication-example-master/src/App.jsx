import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { Nav, PrivateRoute } from '_components';
import { Home } from 'home';
import { Login } from 'login';
import AddEmployee from 'home/AddEmployee';
import UpdateEmployee from 'home/UpdateEmployee';

export { App };

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
                <Routes>
                <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/add-employee" element={
                                                    <PrivateRoute>
                                                        <AddEmployee />
                                                    </PrivateRoute>
                                                } />
                    <Route path="/update-employee/:id" element={
                                                    <PrivateRoute>
                                                        <UpdateEmployee />
                                                    </PrivateRoute>
                                                } />
                </Routes>
            </div>
        </div>
    );
}
