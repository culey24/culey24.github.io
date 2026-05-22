import type { WorkspaceSpecs } from '../cvData';

interface WorkspaceProps {
  workspace: WorkspaceSpecs;
}

export function Workspace({ workspace }: WorkspaceProps) {
  return (
    <div className="workspace-container">
      <div className="section-header-row">
        <h2 className="section-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>Workspace Setup</span>
        </h2>
      </div>

      <div className="workspace-intro">
        <p>
          A tailored local setup optimized for low-latency coding, training local deep learning architectures, 
          and general software development workflows at HCMUT.
        </p>
      </div>

      <div className="workspace-grid">
        {/* Computer */}
        <div className="workspace-card">
          <div className="workspace-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="2" y1="20" x2="22" y2="20" />
              <line x1="12" y1="17" x2="12" y2="20" />
            </svg>
          </div>
          <div className="workspace-card-content">
            <h4>Workstation</h4>
            <p>{workspace.computer}</p>
          </div>
        </div>

        {/* Operating System */}
        <div className="workspace-card">
          <div className="workspace-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="workspace-card-content">
            <h4>Operating System</h4>
            <p>{workspace.os}</p>
          </div>
        </div>

        {/* Editor */}
        <div className="workspace-card">
          <div className="workspace-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <div className="workspace-card-content">
            <h4>Editor / IDE</h4>
            <p>{workspace.editor}</p>
          </div>
        </div>

        {/* Terminal */}
        <div className="workspace-card">
          <div className="workspace-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div className="workspace-card-content">
            <h4>Terminal Environment</h4>
            <p>{workspace.terminal}</p>
          </div>
        </div>
      </div>

      <div className="workspace-gear-section">
        <h3>Peripherals & Desk Gear</h3>
        <ul className="workspace-gear-list">
          {workspace.gear.map((item, idx) => (
            <li key={idx} className="workspace-gear-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="gear-dot">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
