
import Link from 'next/link'
import React from 'react'


const DrawerAdminCompany = () => {
  return (
    <div>
        <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-primary btn-sm drawer-button">Admin Company</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
          <div className="bg-primary text-base-content p-2 rounded mb-2">CUSAUTH</div>
          {/* <li><Link href="/admincomapny/company">Company</Link></li> */}
          <li><Link href="/admincompany/profile-update">Profile Update</Link></li>
          <li><Link href="/admincompany/roles">Roles</Link></li>
          <li><Link href="/admincompany/user-roles">User Roles</Link></li>
          <li><Link href="/admincompany/users">Users</Link></li>
          <li><Link href="/admincompany/authgroup">Authorization Group</Link></li>
          <div className="bg-primary mb-2 text-base-content p-2 rounded">SHLORD</div>
          <li><Link href="/admincompany/assets">Assets</Link></li>
          <li><Link href="/admincompany/fixed-deposits">Fixed Deposits</Link></li>
          <li><Link href="/admincompany/loan-colls">Loan Collections</Link></li>
          <li><Link href="/admincompany/loan-ints">Loan Interests</Link></li>
          <li><Link href="/admincompany/particulars">Particulars</Link></li>
          <li><Link href="/admincompany/persons">Persons</Link></li>
          <li><Link href="/admincompany/rd-colls">RD Collections</Link></li>
          <li><Link href="/admincompany/rd-ints">RD Interests</Link></li>
          <li><Link href="/admincompany/shareholders">Shareholders</Link></li>
          <li><Link href="/admincompany/staff-salaries">Staff Salaries</Link></li>
                    </ul>
                </div>
            </div>
    </div>
  )
}

export default DrawerAdminCompany