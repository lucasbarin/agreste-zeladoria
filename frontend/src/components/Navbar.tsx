'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const isAdmin = user.role === 'admin';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1a472a' }}>
      <div className="container-fluid">
        <Link href={isAdmin ? '/admin/dashboard' : '/morador/dashboard'} className="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="Recanto do Agreste" height="32" style={{ maxWidth: '120px', objectFit: 'contain' }} />
        </Link>
        
        <div className="d-flex align-items-center">
          <span className="text-white me-2 d-none d-md-inline">{user.name}</span>
          <button onClick={logout} className="btn btn-outline-light btn-sm">
            Sair
          </button>
          <button 
            className="navbar-toggler ms-2" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isAdmin ? (
              <>
                <li className="nav-item">
                  <Link 
                    href="/admin/dashboard" 
                    className={`nav-link ${pathname === '/admin/dashboard' ? 'active' : ''}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    href="/admin/ocorrencias" 
                    className={`nav-link ${pathname === '/admin/ocorrencias' ? 'active' : ''}`}
                  >
                    Ocorrências
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    href="/morador/dashboard" 
                    className={`nav-link ${pathname === '/morador/dashboard' ? 'active' : ''}`}
                  >
                    Início
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    href="/morador/nova-ocorrencia" 
                    className={`nav-link ${pathname === '/morador/nova-ocorrencia' ? 'active' : ''}`}
                  >
                    Nova Ocorrência
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    href="/morador/ocorrencias" 
                    className={`nav-link ${pathname === '/morador/ocorrencias' ? 'active' : ''}`}
                  >
                    Minhas Ocorrências
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
