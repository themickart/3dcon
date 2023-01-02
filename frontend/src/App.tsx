import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Bests } from './routes/Bests';
import { ProjectsPage } from './routes/ProjectsPage';
import { ProjectPage } from './routes/ProjectPage/ProjectPage';
import { AccountPage } from './routes/AccountPage/AccountPage';
import { LoginPage } from './routes/LoginPage';
import { Register } from './routes/RegisterPage';
import { ProfilePage } from './routes/ProfilePage/ProfilePage';
import { CategoriesPage } from './routes/CategoriesPage/CategoriesPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<CategoriesPage />} />
                    <Route path="products" element={<ProjectsPage />} />
                    <Route
                        path="products/:productId"
                        element={<ProjectPage />}
                    />
                    <Route path="bests" element={<Bests />} />
                    <Route path="profile" element={<AccountPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<Register />} />
                    <Route path="user">
                        <Route path=":username" element={<ProfilePage />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
