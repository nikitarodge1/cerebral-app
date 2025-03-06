export default function Sidebar() {
    return (
      <div className="h-screen w-64 bg-gray-100 p-5 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          {/* Brand Logo */}
          <h2 className="text-xl font-bold text-gray-800">Salesway</h2>
  
          {/* Menu Section */}
          <nav className="mt-6">
            <h3 className="text-gray-500 uppercase text-sm mb-2">MENU</h3>
            <ul className="space-y-2">
              <SidebarItem icon="📊" text="Dashboard" active />
              <SidebarItem icon="📢" text="Campaigns" />
              <SidebarItem icon="🔄" text="Flows" />
              <SidebarItem icon="🔗" text="Integrations" />
              <SidebarItem icon="👥" text="Customers" />
            </ul>
          </nav>
        </div>
  
        {/* Bottom Section - User Profile */}
        <div className="flex items-center space-x-3">
          <img 
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
            alt="User" 
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-800 font-medium">Tom Wang</span>
        </div>
      </div>
    );
  }
  
  // Sidebar Item Component
  function SidebarItem({ icon, text, active }) {
    return (
      <li
        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer 
          ${active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </li>
    );
  }
  