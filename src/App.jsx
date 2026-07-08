import ResultGrid from "./components/ResultGrid"
import SearchBar from "./components/SearchBar"
import Tab from "./components/Tab"
import MediaDetailPage from "./pages/MediaDetailPage"
import { Route, Routes } from "react-router-dom"



const App = () => {

   
  return (
    <div className=" w-full bg-emerald-800 text-white ">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar />
              <Tab />
              <ResultGrid />
            </>
          }
        />

       <Route path="/Media/:id" element={<MediaDetailPage />} />
       
      </Routes>
    </div>
  );
}

export default App 