export function ExcelLeadsMockup() {
  const leads = [
    { name: "John Martinez", phone: "(415) 555-0123", title: "VP of Sales", company: "TechCorp", status: "Hot" },
    { name: "Sarah Chen", phone: "(628) 555-0145", title: "Marketing Director", company: "Growth Inc", status: "Warm" },
    { name: "Michael Brown", phone: "(510) 555-0198", title: "CEO", company: "StartupXYZ", status: "Hot" },
    { name: "Emily Davis", phone: "(415) 555-0167", title: "Head of Ops", company: "Scale Co", status: "Cold" },
    { name: "David Wilson", phone: "(650) 555-0189", title: "Sales Manager", company: "BigCorp", status: "Warm" },
  ];

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm text-xs">
      {/* Excel-like header */}
      <div className="flex items-center gap-1 mb-2 pb-2 border-b border-gray-200">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span className="ml-2 text-gray-600 font-medium">Lead_List_2025.xlsx</span>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-5 gap-1 bg-gray-100 p-1.5 border border-gray-300 rounded-t">
          <div className="font-semibold text-gray-700">Name</div>
          <div className="font-semibold text-gray-700">Phone</div>
          <div className="font-semibold text-gray-700">Title</div>
          <div className="font-semibold text-gray-700">Company</div>
          <div className="font-semibold text-gray-700">Status</div>
        </div>
        {leads.map((lead, index) => (
          <div 
            key={index} 
            className="grid grid-cols-5 gap-1 p-1.5 border-x border-b border-gray-300 hover:bg-blue-50 transition-colors"
          >
            <div className="text-gray-800 truncate">{lead.name}</div>
            <div className="text-gray-600 truncate">{lead.phone}</div>
            <div className="text-gray-600 truncate text-[10px]">{lead.title}</div>
            <div className="text-gray-600 truncate text-[10px]">{lead.company}</div>
            <div>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                lead.status === 'Hot' ? 'bg-red-100 text-red-700' :
                lead.status === 'Warm' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {lead.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row count footer */}
      <div className="mt-2 text-gray-500 text-[10px]">
        Showing 5 of 1,247 leads
      </div>
    </div>
  );
}
