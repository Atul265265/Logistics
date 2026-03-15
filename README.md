# Logistics Management Dashboard

This project is a role-based logistics and fleet management dashboard.

It demonstrates how a logistics company can use one system to manage operations across multiple departments such as owners, HR, dispatch, drivers, mechanics, safety compliance, support, and employees.

## Live Project

View the live dashboard here:

[Live Dashboard](https://atul265265.github.io/Logistics/)

## Project Overview

The Logistics Management Dashboard is designed as a prototype for a modern logistics platform.  
It shows how multiple roles in a company can work with shared data while using role-specific tools and reports.

The dashboard includes:

- Role-based navigation
- Shared application data
- Clickable dashboard cards
- Fleet analytics
- Dispatch and driver tracking
- HR complaint workflow
- Mechanics work orders
- Safety compliance records
- Support ticket management
- AI chat assistant
- Role-aware actions and report generation
- Save, cancel, and report notifications
- README popup from the LP logo

## Roles Included

### Owner
Owners can view analytics, smart AI suggestions, and overall operational summaries.

### HR/Admin
HR/Admin can open complaints, manage investigations, and review employee-related records.

### Employees
Employees can view assigned tasks, notices, and submit requests.

### Drivers
Drivers can view assigned loads, route status, and update delivery progress.

### Mechanics
Mechanics can open work orders, manage parts, and track inspections.

### Dispatch
Dispatch can manage loads, assign drivers, and share delivery details.

### Safety Compliance
Safety compliance can manage insurance, audits, incident records, tow records, and equipment checks.

### Support
Support can manage tickets, complaints, escalations, and customer follow-ups.

## Main Features

### 1. Role-Based Dashboard
Each role has a separate dashboard view with different content and actions.

### 2. Shared Data Model
The project uses shared JavaScript data so multiple modules can read related information from the same source.

Shared data includes:
- Loads
- Employees
- Complaints
- Work Orders
- Safety Records
- Support Tickets
- Owner Insights

### 3. Owner Analytics
The Owner Dashboard includes:
- Active Loads
- Drivers on Road
- Open Work Orders
- Safety Alerts
- Revenue Chart
- Live Fleet Tracking
- AI Suggestions

### 4. Dynamic Card Navigation
Dashboard cards can navigate users to related modules.  
For example:
- Active Loads → Dispatch
- Drivers on Road → Drivers
- Open Work Orders → Mechanics
- Safety Alerts → Safety Compliance

### 5. AI Logistics Assistant
The project includes a floating AI assistant with:
- Send message
- Minimize
- Expand
- Close
- Reopen button

The assistant can answer demo questions related to:
- loads
- drivers
- HR complaints
- work orders
- safety records
- support tickets
- analytics

### 6. Role-Aware Top Bar Actions
The top bar changes based on the current role.

#### Primary Action Button
The first button changes label and form fields according to the selected role.

Examples:
- Owner → New Load
- Dispatch → New Load
- HR/Admin → New Complaint
- Employees → Submit Request
- Drivers → Update Status
- Mechanics → Open Work Order
- Safety Compliance → Add Safety Record
- Support → Create Ticket

#### Report Button
The second button always generates a role-specific report.

Examples:
- Owner Report
- Dispatch Report
- HR Report
- Employee Report
- Driver Report
- Mechanics Report
- Safety Report
- Support Report

### 7. Save / Cancel / Report Notifications
Centered toast notifications are shown after important actions.

Examples:
- Load Saved
- Load Cancelled
- Complaint Saved
- Complaint Cancelled
- Request Submitted
- Work Order Saved
- Safety Record Saved
- Ticket Saved
- Report Generated
- Report Closed
- Report Sent to Print

### 8. README Popup
The LP logo in the sidebar is clickable.  
When clicked, it opens a modal window showing the README/project summary.

## Technologies Used

- HTML
- CSS
- JavaScript
- Chart.js
- GitHub Pages

## Project Structure

### `index.html`
Contains:
- sidebar
- top bar
- role dashboards
- AI assistant
- action modal
- report modal
- README modal
- toast notification element

### `style.css`
Contains:
- dashboard layout styling
- sidebar styling
- cards and table styling
- fleet tracking map styling
- AI assistant styling
- modal styling
- toast notification styling
- LP button styling

### `app.js`
Contains:
- shared data model
- page navigation logic
- card rendering
- role-based top bar behavior
- form handling
- role-specific report generation
- AI assistant logic
- toast notifications
- README modal logic

## Example Workflows

### Owner Workflow
- View analytics
- Open a new load form
- Save new load
- Generate owner report
- View AI suggestions

### HR Workflow
- Open complaint form
- Save complaint
- Generate HR report
- Review employee records

### Dispatch Workflow
- Create new load
- Assign driver
- View dispatch table
- Generate dispatch report

### Mechanics Workflow
- Open work order
- Save work order
- Generate mechanics report

### Safety Workflow
- Add safety record
- Save compliance record
- Generate safety report

### Support Workflow
- Create support ticket
- Save ticket
- Generate support report

## Purpose of the Project

The purpose of this project is to demonstrate how one logistics platform can support multiple departments through:
- role-based access
- shared data
- interactive workflows
- reporting
- notifications
- AI-assisted support

This project is a front-end prototype intended for school submission and concept demonstration.

## Future Improvements

Possible future upgrades include:
- real database integration
- user authentication and login
- backend APIs
- PDF report export
- search and filtering
- real GPS/live map integration
- real AI backend integration
- cloud deployment with backend services

## Author

Project is created by Atul Sharma.
