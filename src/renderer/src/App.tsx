// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './constants'
import { Clients } from './screens/Clients'
import { Orders } from './screens/Orders'
import { Home } from './screens/Home'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <Home />,
      children: [
        {
          path: ROUTES.CLIENTS,
          element: <Clients />
        },
        {
          path: ROUTES.ORDERS,
          element: <Orders />
        }
      ]
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )

  // <>
  //   <img alt="logo" className="logo" src={electronLogo} />
  //   <div className="creator">Powered by electron-vite</div>
  //   <div className="text">
  //     Build an Electron app with <span className="react">React</span>
  //     &nbsp;and <span className="ts">TypeScript</span>
  //   </div>
  //   <p className="tip">
  //     Please try pressing <code>F12</code> to open the devTool
  //   </p>
  //   <div className="actions">
  //     <div className="action">
  //       <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
  //         Documentation
  //       </a>
  //     </div>
  //     <div className="action">
  //       <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
  //         Send IPC
  //       </a>
  //     </div>
  //   </div>
  //   <Versions></Versions>
  // </>
}

export default App
