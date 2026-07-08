import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/SearchSlice'

const Tab = () => {

  const tabs = ["Photos", "Videos"]

  const dispatch = useDispatch()

  const activeTab = useSelector((state) => state.search.ActiveTabs)
  return (
    <div className = 'flex gap-5 p-10'>
      {tabs.map((elem, idx) =>{
        return(
          <button className={`${(activeTab == elem ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700")} py-2 px-10 rounded outline-none active:scale-95 transition ` } onClick={()=>{
            dispatch(setActiveTabs(elem))
          }}  >{elem}</button>
        )
      })}

    </div>
  )
}

export default Tab