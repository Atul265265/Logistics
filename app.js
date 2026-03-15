const appData = {
  loads: [
    {
      id: "L1001",
      driver: "Mike",
      pickup: "Dallas",
      delivery: "Houston",
      status: "In Transit"
    },
    {
      id: "L1002",
      driver: "John",
      pickup: "Austin",
      delivery: "San Antonio",
      status: "Assigned"
    }
  ],

  employees: [
    {
      id: "EMP102",
      task: "Load documentation review",
      notice: "Safety meeting on Friday",
      complaintPortal: "Available"
    }
  ],

  complaints: [
    {
      title: "Open Complaint",
      value: "Driver conduct issue reported",
      route: "support"
    },
    {
      title: "Investigation",
      value: "Workplace safety complaint under review",
      route: "employees"
    },
    {
      title: "HR Action",
      value: "Interview scheduled with employee",
      route: "employees"
    },
    {
      title: "Status",
      value: "Investigation currently in progress",
      route: "support"
    },
    {
      title: "Employee Records",
      value: "Complaint tracking and employee records available",
      route: "employees"
    }
  ],

  workOrders: [
    {
      title: "Open Work Order",
      value: "Truck 22 brake repair",
      route: "dispatch"
    },
    {
      title: "Charge Parts",
      value: "Brake pads and oil filter",
      route: "dispatch"
    },
    {
      title: "Inspection Report",
      value: "Pending update for Truck 15",
      route: "safety"
    },
    {
      title: "Repair Status",
      value: "Truck 19 completed",
      route: "owner"
    }
  ],

  safetyRecords: [
    {
      title: "Insurance",
      value: "Truck 11 renewal due in 14 days",
      route: "owner"
    },
    {
      title: "Safety Report",
      value: "Driver incident logged",
      route: "support"
    },
    {
      title: "Tow Record",
      value: "Truck 8 service entry available",
      route: "mechanics"
    },
    {
      title: "Audit Status",
      value: "Monthly audit scheduled",
      route: "owner"
    },
    {
      title: "Equipment",
      value: "All trailers inspected",
      route: "mechanics"
    }
  ],

  supportTickets: [
    {
      title: "Ticket 201",
      value: "Delivery delay",
      route: "dispatch"
    },
    {
      title: "Ticket 205",
      value: "Load tracking issue",
      route: "drivers"
    },
    {
      title: "Customer Complaint",
      value: "Late delivery follow-up",
      route: "hr"
    },
    {
      title: "Escalation",
      value: "Waiting for dispatch update",
      route: "dispatch"
    }
  ],

  ownerInsights: [
    {
      title: "Maintenance Insight",
      value: "Truck 12 requires preventive maintenance soon",
      route: "mechanics"
    },
    {
      title: "Fuel Analysis",
      value: "Fuel usage increased by 6 percent this week",
      route: "drivers"
    },
    {
      title: "Route Optimization",
      value: "Route optimization could save operational cost",
      route: "dispatch"
    },
    {
      title: "Insurance Alert",
      value: "Insurance renewal is approaching for one vehicle",
      route: "safety"
    }
  ]
};

let currentRoleKey = "owner";
let toastTimer = null;

const roleConfigs = {
  owner: {
    roleName: "Owner",
    actionLabel: "New Load",
    actionTitle: "New Load",
    saveLabel: "Save Load",
    saveMessage: "Load Saved",
    cancelMessage: "Load Cancelled",
    reportGeneratedMessage: "Owner Report Generated",
    reportClosedMessage: "Owner Report Closed",
    reportPrintedMessage: "Owner Report Sent to Print",
    fields: [
      { label: "Load ID", placeholder: "L1003" },
      { label: "Driver", placeholder: "Driver name" },
      { label: "Pickup", placeholder: "Pickup location" },
      { label: "Delivery", placeholder: "Delivery location" },
      { label: "Details", placeholder: "Customer, notes, priority" }
    ]
  },
  dispatch: {
    roleName: "Dispatch",
    actionLabel: "New Load",
    actionTitle: "New Load",
    saveLabel: "Save Load",
    saveMessage: "Load Saved",
    cancelMessage: "Load Cancelled",
    reportGeneratedMessage: "Dispatch Report Generated",
    reportClosedMessage: "Dispatch Report Closed",
    reportPrintedMessage: "Dispatch Report Sent to Print",
    fields: [
      { label: "Load ID", placeholder: "L1003" },
      { label: "Driver", placeholder: "Assigned driver" },
      { label: "Pickup", placeholder: "Pickup location" },
      { label: "Delivery", placeholder: "Delivery location" },
      { label: "Details", placeholder: "Route notes, customer update" }
    ]
  },
  hr: {
    roleName: "HR/Admin",
    actionLabel: "New Complaint",
    actionTitle: "New Complaint",
    saveLabel: "Save Complaint",
    saveMessage: "Complaint Saved",
    cancelMessage: "Complaint Cancelled",
    reportGeneratedMessage: "HR Report Generated",
    reportClosedMessage: "HR Report Closed",
    reportPrintedMessage: "HR Report Sent to Print",
    fields: [
      { label: "Complaint ID", placeholder: "CMP101" },
      { label: "Employee", placeholder: "Employee name" },
      { label: "Issue Type", placeholder: "Conduct / Safety / Policy" },
      { label: "Status", placeholder: "Open / Under Review" },
      { label: "Details", placeholder: "Complaint details" }
    ]
  },
  employees: {
    roleName: "Employees",
    actionLabel: "Submit Request",
    actionTitle: "Submit Request",
    saveLabel: "Submit Request",
    saveMessage: "Request Submitted",
    cancelMessage: "Request Cancelled",
    reportGeneratedMessage: "Employee Report Generated",
    reportClosedMessage: "Employee Report Closed",
    reportPrintedMessage: "Employee Report Sent to Print",
    fields: [
      { label: "Request ID", placeholder: "REQ101" },
      { label: "Employee ID", placeholder: "EMP102" },
      { label: "Request Type", placeholder: "Task / Issue / Leave" },
      { label: "Priority", placeholder: "Low / Medium / High" },
      { label: "Details", placeholder: "Request details" }
    ]
  },
  drivers: {
    roleName: "Drivers",
    actionLabel: "Update Status",
    actionTitle: "Update Delivery Status",
    saveLabel: "Save Status",
    saveMessage: "Status Updated",
    cancelMessage: "Status Update Cancelled",
    reportGeneratedMessage: "Driver Report Generated",
    reportClosedMessage: "Driver Report Closed",
    reportPrintedMessage: "Driver Report Sent to Print",
    fields: [
      { label: "Load ID", placeholder: "L1001" },
      { label: "Driver", placeholder: "Driver name" },
      { label: "Current Location", placeholder: "Current location" },
      { label: "Status", placeholder: "In Transit / Delivered" },
      { label: "Details", placeholder: "Delivery notes" }
    ]
  },
  mechanics: {
    roleName: "Mechanics",
    actionLabel: "Open Work Order",
    actionTitle: "Open Work Order",
    saveLabel: "Save Work Order",
    saveMessage: "Work Order Saved",
    cancelMessage: "Work Order Cancelled",
    reportGeneratedMessage: "Mechanics Report Generated",
    reportClosedMessage: "Mechanics Report Closed",
    reportPrintedMessage: "Mechanics Report Sent to Print",
    fields: [
      { label: "Work Order ID", placeholder: "WO101" },
      { label: "Truck", placeholder: "Truck number" },
      { label: "Issue", placeholder: "Brake / Engine / Tire" },
      { label: "Status", placeholder: "Open / In Progress" },
      { label: "Details", placeholder: "Repair or inspection notes" }
    ]
  },
  safety: {
    roleName: "Safety Compliance",
    actionLabel: "Add Safety Record",
    actionTitle: "Add Safety Record",
    saveLabel: "Save Record",
    saveMessage: "Safety Record Saved",
    cancelMessage: "Safety Record Cancelled",
    reportGeneratedMessage: "Safety Report Generated",
    reportClosedMessage: "Safety Report Closed",
    reportPrintedMessage: "Safety Report Sent to Print",
    fields: [
      { label: "Record ID", placeholder: "SAFE101" },
      { label: "Category", placeholder: "Insurance / Audit / Tow" },
      { label: "Equipment", placeholder: "Truck / Trailer / Unit" },
      { label: "Status", placeholder: "Open / Closed / Due" },
      { label: "Details", placeholder: "Safety record details" }
    ]
  },
  support: {
    roleName: "Support",
    actionLabel: "Create Ticket",
    actionTitle: "Create Support Ticket",
    saveLabel: "Save Ticket",
    saveMessage: "Ticket Saved",
    cancelMessage: "Ticket Cancelled",
    reportGeneratedMessage: "Support Report Generated",
    reportClosedMessage: "Support Report Closed",
    reportPrintedMessage: "Support Report Sent to Print",
    fields: [
      { label: "Ticket ID", placeholder: "TKT301" },
      { label: "Customer", placeholder: "Customer name" },
      { label: "Issue Type", placeholder: "Delay / Tracking / Complaint" },
      { label: "Status", placeholder: "Open / Escalated" },
      { label: "Details", placeholder: "Support issue details" }
    ]
  }
};

function getCurrentConfig() {
  return roleConfigs[currentRoleKey] || roleConfigs.owner;
}

function getRoleDisplayName(page) {
  const config = roleConfigs[page];
  return config ? config.roleName : "Owner";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;
  toast.classList.remove("hidden");

  if (toastTimer) clearTimeout(toastTimer);

  toastTimer = setTimeout(function() {
    toast.classList.add("hidden");
  }, 2200);
}

function showPage(page) {
  currentRoleKey = page;

  document.querySelectorAll(".page").forEach(function(p) {
    p.classList.add("hidden");
  });

  const activePage = document.getElementById(page);
  if (activePage) {
    activePage.classList.remove("hidden");
  }

  document.querySelectorAll(".sidebar button").forEach(function(btn) {
    btn.classList.remove("active-menu");
  });

  const activeButton = document.querySelector('.sidebar button[data-page="' + page + '"]');
  if (activeButton) activeButton.classList.add("active-menu");

  const roleElement = document.getElementById("currentRole");
  if (roleElement) roleElement.innerText = "Current Role: " + getRoleDisplayName(page);

  updateTopbarActions();
  renderAllData();
}

function updateTopbarActions() {
  const config = getCurrentConfig();
  const primaryBtn = document.getElementById("primaryActionBtn");
  const reportBtn = document.getElementById("reportActionBtn");

  if (primaryBtn) primaryBtn.innerText = config.actionLabel;
  if (reportBtn) reportBtn.innerText = "Generate Report";
}

function renderCards(containerId, items, iconText) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  items.forEach(function(item) {
    const clickableClass = item.route ? " clickable-card" : "";
    const clickAction = item.route ? `onclick="showPage('${item.route}')"` : "";

    container.innerHTML += `
      <div class="role-card${clickableClass}" ${clickAction}>
        <div class="role-icon">${iconText}</div>
        <h3>${item.title}</h3>
        <p>${item.value}</p>
      </div>
    `;
  });
}

function renderOwnerInsights() {
  renderCards("ownerInsights", appData.ownerInsights, "AI");

  const activeLoads = document.getElementById("statActiveLoads");
  const driversOnRoad = document.getElementById("statDriversOnRoad");
  const openWorkOrders = document.getElementById("statOpenWorkOrders");
  const safetyAlerts = document.getElementById("statSafetyAlerts");

  if (activeLoads) activeLoads.innerText = appData.loads.length;
  if (driversOnRoad) driversOnRoad.innerText = appData.loads.length;
  if (openWorkOrders) openWorkOrders.innerText = appData.workOrders.length;
  if (safetyAlerts) safetyAlerts.innerText = 3;
}

function renderDispatchTable() {
  const tableBody = document.getElementById("dispatchTable");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  appData.loads.forEach(function(load) {
    tableBody.innerHTML += `
      <tr>
        <td>${load.id}</td>
        <td>${load.driver}</td>
        <td>${load.pickup}</td>
        <td>${load.delivery}</td>
        <td>${load.status}</td>
      </tr>
    `;
  });
}

function renderDrivers() {
  const container = document.getElementById("driversLoads");
  if (!container) return;

  container.innerHTML = "";

  appData.loads.forEach(function(load) {
    container.innerHTML += `
      <div class="role-card clickable-card" onclick="showPage('dispatch')">
        <div class="role-icon">DRV</div>
        <h3>${load.driver}</h3>
        <p>Load ID: ${load.id}</p>
        <p>Pickup: ${load.pickup}</p>
        <p>Delivery: ${load.delivery}</p>
        <p>Status: ${load.status}</p>
      </div>
    `;
  });
}

function renderEmployees() {
  const container = document.getElementById("employeesCards");
  if (!container) return;

  container.innerHTML = "";

  appData.employees.forEach(function(emp) {
    container.innerHTML += `
      <div class="role-card clickable-card" onclick="showPage('hr')">
        <div class="role-icon">ID</div>
        <h3>Employee ID</h3>
        <p>${emp.id}</p>
      </div>

      <div class="role-card clickable-card" onclick="showPage('dispatch')">
        <div class="role-icon">TASK</div>
        <h3>Assigned Task</h3>
        <p>${emp.task}</p>
      </div>

      <div class="role-card clickable-card" onclick="showPage('hr')">
        <div class="role-icon">NOTE</div>
        <h3>Department Notice</h3>
        <p>${emp.notice}</p>
      </div>

      <div class="role-card clickable-card" onclick="showPage('hr')">
        <div class="role-icon">FORM</div>
        <h3>Complaint Portal</h3>
        <p>${emp.complaintPortal}</p>
      </div>
    `;
  });
}

function renderDispatchCards() {
  const items = [
    { title: "Driver Sharing", value: "Load details shared with driver", route: "drivers" },
    { title: "Customer Tracking", value: "Customer delivery details shared", route: "support" },
    { title: "Driver Location", value: "Driver location visible live", route: "drivers" },
    { title: "Live Messages", value: "Route update sent to driver", route: "drivers" },
    { title: "Database Access", value: "Full operational access enabled", route: "owner" }
  ];

  renderCards("dispatchCards", items, "OPS");
}

function renderAllData() {
  renderOwnerInsights();
  renderDispatchTable();
  renderDrivers();
  renderEmployees();
  renderCards("hrCards", appData.complaints, "HR");
  renderCards("mechanicsCards", appData.workOrders, "MEC");
  renderCards("safetyCards", appData.safetyRecords, "SAFE");
  renderCards("supportCards", appData.supportTickets, "SUP");
  renderDispatchCards();
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");

  if (!input || !messages) return;

  const userText = input.value.trim();
  if (userText === "") return;

  messages.innerHTML += `<div class="user-message">${userText}</div>`;

  let reply = "I can help with logistics, dispatch, drivers, HR, maintenance, support, and safety information.";
  const text = userText.toLowerCase();

  if (text.includes("load")) reply = "There are currently " + appData.loads.length + " active loads in the system.";
  else if (text.includes("driver")) reply = "There are currently " + appData.loads.length + " drivers assigned to active loads.";
  else if (text.includes("hr") || text.includes("complaint")) reply = "HR currently has " + appData.complaints.length + " complaint and investigation records.";
  else if (text.includes("mechanic") || text.includes("work order")) reply = "There are currently " + appData.workOrders.length + " work order records in the system.";
  else if (text.includes("safety") || text.includes("insurance") || text.includes("audit")) reply = "Safety compliance currently tracks " + appData.safetyRecords.length + " safety-related records.";
  else if (text.includes("support")) reply = "Support currently has " + appData.supportTickets.length + " ticket and escalation records.";
  else if (text.includes("employee")) reply = "There are " + appData.employees.length + " employee records in this demo system.";
  else if (text.includes("owner") || text.includes("analytics")) reply = "Owner analytics include active loads, drivers on road, open work orders, and safety alerts.";
  else if (text.includes("dispatch")) reply = "Dispatch can manage loads, share details with drivers, update customers, and track driver activity.";

  setTimeout(function() {
    messages.innerHTML += `<div class="ai-message">${reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 300);

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}

function toggleMinimize() {
  const chatBox = document.getElementById("aiChatBox");
  if (chatBox) {
    chatBox.classList.toggle("minimized");
    chatBox.classList.remove("expanded");
  }
}

function toggleExpand() {
  const chatBox = document.getElementById("aiChatBox");
  if (chatBox) {
    chatBox.classList.toggle("expanded");
    chatBox.classList.remove("minimized");
  }
}

function closeChat() {
  const chatBox = document.getElementById("aiChatBox");
  const launcher = document.getElementById("chatLauncher");

  if (chatBox) chatBox.classList.add("hidden");
  if (launcher) launcher.classList.remove("hidden");
}

function openChat() {
  const chatBox = document.getElementById("aiChatBox");
  const launcher = document.getElementById("chatLauncher");

  if (chatBox) {
    chatBox.classList.remove("hidden");
    chatBox.classList.remove("minimized");
  }

  if (launcher) launcher.classList.add("hidden");
}

function openPrimaryActionWindow() {
  const config = getCurrentConfig();
  const modal = document.getElementById("primaryActionModal");

  document.getElementById("primaryActionTitle").innerText = config.actionTitle;
  document.getElementById("primaryActionNote").innerText =
    "You are performing this action from the " + config.roleName + " module.";

  document.getElementById("field1Label").innerText = config.fields[0].label;
  document.getElementById("field2Label").innerText = config.fields[1].label;
  document.getElementById("field3Label").innerText = config.fields[2].label;
  document.getElementById("field4Label").innerText = config.fields[3].label;
  document.getElementById("field5Label").innerText = config.fields[4].label;

  document.getElementById("field1Input").placeholder = config.fields[0].placeholder;
  document.getElementById("field2Input").placeholder = config.fields[1].placeholder;
  document.getElementById("field3Input").placeholder = config.fields[2].placeholder;
  document.getElementById("field4Input").placeholder = config.fields[3].placeholder;
  document.getElementById("field5Input").placeholder = config.fields[4].placeholder;

  document.getElementById("primaryActionSaveBtn").innerText = config.saveLabel;

  if (modal) modal.classList.remove("hidden");
}

function closePrimaryActionWindow() {
  const modal = document.getElementById("primaryActionModal");
  if (modal) modal.classList.add("hidden");
}

function cancelPrimaryAction() {
  const config = getCurrentConfig();
  closePrimaryActionWindow();
  showToast(config.cancelMessage);
}

function clearPrimaryActionForm() {
  document.getElementById("field1Input").value = "";
  document.getElementById("field2Input").value = "";
  document.getElementById("field3Input").value = "";
  document.getElementById("field4Input").value = "";
  document.getElementById("field5Input").value = "";
}

function savePrimaryAction() {
  const config = getCurrentConfig();

  const value1 = document.getElementById("field1Input").value.trim();
  const value2 = document.getElementById("field2Input").value.trim();
  const value3 = document.getElementById("field3Input").value.trim();
  const value4 = document.getElementById("field4Input").value.trim();
  const value5 = document.getElementById("field5Input").value.trim();

  if (currentRoleKey === "owner" || currentRoleKey === "dispatch") {
    appData.loads.push({
      id: value1 || "L" + (1000 + appData.loads.length + 1),
      driver: value2 || "Unassigned",
      pickup: value3 || "Not set",
      delivery: value4 || "Not set",
      status: "Assigned"
    });
    showPage("dispatch");
  } else if (currentRoleKey === "hr") {
    appData.complaints.push({
      title: value3 || "New Complaint",
      value: value5 || "Complaint created",
      route: "support"
    });
    showPage("hr");
  } else if (currentRoleKey === "employees") {
    appData.employees[0] = {
      id: value2 || "EMP102",
      task: value3 || "New Task Request",
      notice: value4 || "Updated notice",
      complaintPortal: "Available"
    };
    showPage("employees");
  } else if (currentRoleKey === "drivers") {
    if (appData.loads.length > 0) {
      appData.loads[0].status = value4 || "Updated";
    }
    showPage("drivers");
  } else if (currentRoleKey === "mechanics") {
    appData.workOrders.push({
      title: value3 || "New Work Order",
      value: value5 || "Work order created",
      route: "dispatch"
    });
    showPage("mechanics");
  } else if (currentRoleKey === "safety") {
    appData.safetyRecords.push({
      title: value2 || "New Safety Record",
      value: value5 || "Safety record created",
      route: "owner"
    });
    showPage("safety");
  } else if (currentRoleKey === "support") {
    appData.supportTickets.push({
      title: value1 || "New Ticket",
      value: value5 || "Support ticket created",
      route: "dispatch"
    });
    showPage("support");
  }

  renderAllData();
  closePrimaryActionWindow();
  clearPrimaryActionForm();
  showToast(config.saveMessage);
}

function buildRoleReportHtml() {
  const roleName = getRoleDisplayName(currentRoleKey);

  if (currentRoleKey === "owner") {
    return `
      <div class="report-summary">
        <div class="report-summary-card"><h4>Active Loads</h4><p>${appData.loads.length}</p></div>
        <div class="report-summary-card"><h4>Work Orders</h4><p>${appData.workOrders.length}</p></div>
        <div class="report-summary-card"><h4>Safety Records</h4><p>${appData.safetyRecords.length}</p></div>
        <div class="report-summary-card"><h4>Support Tickets</h4><p>${appData.supportTickets.length}</p></div>
      </div>
      <div class="report-section"><h3>${roleName} Summary</h3><ul class="report-list">${appData.ownerInsights.map(i => `<li>${i.title}: ${i.value}</li>`).join("")}</ul></div>
    `;
  }

  if (currentRoleKey === "dispatch") {
    return `
      <div class="report-section"><h3>Dispatch Loads</h3><ul class="report-list">${appData.loads.map(l => `<li>${l.id} - ${l.driver} - ${l.pickup} to ${l.delivery} - ${l.status}</li>`).join("")}</ul></div>
    `;
  }

  if (currentRoleKey === "drivers") {
    return `
      <div class="report-section"><h3>Driver Load Summary</h3><ul class="report-list">${appData.loads.map(l => `<li>${l.driver}: ${l.id} - ${l.status}</li>`).join("")}</ul></div>
    `;
  }

  if (currentRoleKey === "hr") {
    return `
      <div class="report-section"><h3>HR Complaints Report</h3><ul class="report-list">${appData.complaints.map(c => `<li>${c.title}: ${c.value}</li>`).join("")}</ul></div>
    `;
  }

  if (currentRoleKey === "employees") {
    return `
      <div class="report-section"><h3>Employee Summary</h3><ul class="report-list">${appData.employees.map(e => `<li>${e.id} - Task: ${e.task} - Notice: ${e.notice}</li>`).join("")}</ul></div>
    `;
  }

  if (currentRoleKey === "mechanics") {
    return `
      <div class="report-section"><h3>Mechanics Report</h3><ul class="report-list">${appData.workOrders.map(w => `<li>${w.title}: ${w.value}</li>`).join("")}</ul></div>
    `;
  }

  if (currentRoleKey === "safety") {
    return `
      <div class="report-section"><h3>Safety Compliance Report</h3><ul class="report-list">${appData.safetyRecords.map(s => `<li>${s.title}: ${s.value}</li>`).join("")}</ul></div>
    `;
  }

  if (currentRoleKey === "support") {
    return `
      <div class="report-section"><h3>Support Ticket Report</h3><ul class="report-list">${appData.supportTickets.map(t => `<li>${t.title}: ${t.value}</li>`).join("")}</ul></div>
    `;
  }

  return `<div class="report-section"><h3>General Report</h3><p>No data available.</p></div>`;
}

function openReportWindow() {
  const config = getCurrentConfig();
  const modal = document.getElementById("reportModal");
  const title = document.getElementById("reportTitle");
  const note = document.getElementById("reportRoleNote");
  const content = document.getElementById("reportContent");

  title.innerText = "Generated Report - " + getRoleDisplayName(currentRoleKey);
  note.innerText = "This report was generated from the " + getRoleDisplayName(currentRoleKey) + " module.";
  content.innerHTML = buildRoleReportHtml();

  if (modal) modal.classList.remove("hidden");
  showToast(config.reportGeneratedMessage);
}

function closeReportWindow(showMessage) {
  const modal = document.getElementById("reportModal");
  if (modal) modal.classList.add("hidden");

  if (showMessage) showToast(getCurrentConfig().reportClosedMessage);
}

function printReport() {
  const config = getCurrentConfig();
  const content = document.getElementById("reportContent");
  if (!content) return;

  const printWindow = window.open("", "_blank", "width=900,height=700");
  printWindow.document.write(`
    <html>
      <head>
        <title>Logistics Report</title>
        <style>
          body{font-family:Arial,sans-serif;padding:24px;color:#111827;}
          h1,h2,h3,h4{margin:0 0 12px 0;}
          .report-summary{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:24px;}
          .report-summary-card{border:1px solid #ddd;border-radius:10px;padding:12px;}
          .report-section{margin-bottom:20px;}
          .report-list{line-height:1.7;}
        </style>
      </head>
      <body>
        <h1>Fleet Operations Report</h1>
        <h3>${getRoleDisplayName(currentRoleKey)}</h3>
        ${content.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();

  showToast(config.reportPrintedMessage);
}

function openReadmeModal() {
  const modal = document.getElementById("readmeModal");
  if (modal) modal.classList.remove("hidden");
}

function closeReadmeModal() {
  const modal = document.getElementById("readmeModal");
  if (modal) modal.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function() {
  const ctx = document.getElementById("revenueChart");

  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{
          label: "Revenue",
          data: [12000, 18000, 15000, 22000, 26000],
          borderWidth: 2,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }

  const chatInput = document.getElementById("chatInput");
  if (chatInput) {
    chatInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  }

  renderAllData();
  showPage("owner");
});
