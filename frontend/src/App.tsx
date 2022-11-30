import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Populars } from './routes/Populars';
import { Projects } from './routes/Projects';
import { Pictures } from './routes/Pictures';
import { ProjectPage } from './routes/ProjectPage/ProjectPage';
import { ProfilePage } from './routes/ProfilePage/ProfilePage';
import { LoginPage } from './routes/LoginPage';
import { Register } from './routes/RegisterPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Projects />} />
                    <Route path=":productId" element={<ProjectPage />} />
                    <Route path="populars" element={<Populars />} />
                    <Route path="pictures" element={<Pictures />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
