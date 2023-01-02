// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from './pages/SignUp';
import Signin from './pages/SignIn';
import useDarkMode from '../src/hooks/darkMode';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </BrowserRouter>

      <div data-dial-init class="fixed right-6 bottom-6 group">
        <div id="speed-dial-menu-default" class="flex flex-col items-center mb-4 space-y-2">
        </div>
        <ThemeIcon/>
      </div>

    </div>
  );
}

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
      // <button onClick={handleMode} id="theme-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5 mr-5">
        <button onClick={handleMode} type="button" data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" class="flex justify-center items-center w-14 h-14 text-white bg-blue-700 rounded-full hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ">

          {darkTheme ? (
              <svg id="theme-toggle-light-icon" className="w-5 h-5 transition-transform group-hover:rotate-45" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          ) : (
              <svg id="theme-toggle-dark-icon" className="w-5 h-5 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
          )}
      </button>
  )
}

export default App;