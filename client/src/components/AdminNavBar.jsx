import React from 'react'
import { FaAlignLeft } from "react-icons/fa";

function AdminNavBar() {
  return (
    <div>
        <header className="bg-green-400  px-12 py-6">
            <span className="font-kotta text-4xl">Fresh List{' '}<FaAlignLeft className="inline-block w-6 h-6"></FaAlignLeft></span>
            
        </header>
    </div>
  )
}

export default AdminNavBar