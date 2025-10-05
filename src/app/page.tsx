import Link from 'next/link';
import { Button } from '@/shared/components/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header Section */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DB</span>
              </div>
              <div>
                <h1 className="text-heading text-foreground">DeFi Borrow Dashboard</h1>
                <p className="text-caption text-muted-foreground">Secure crypto-backed lending platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-primary-600">Connected to Ethereum</span>
              </div>
              <Button variant="outline" size="sm">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            <button className="tab-button active">Overview</button>
            <button className="tab-button">Market Analysis</button>
            <button className="tab-button">Borrowing Stats</button>
            <button className="tab-button">Risk Assessment</button>
            <button className="tab-button">Portfolio</button>
          </nav>
        </div>

        {/* Key Metrics Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
                <h2 className="text-heading text-foreground">Key Performance Metrics</h2>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-primary-700 transition-all duration-200 focus:outline-none">
                Non-Branded
              </button>
              <button className="px-4 py-2 bg-surface border border-border text-foreground rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none">
                Branded
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Value Locked */}
            <div className="metric-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="metric-label">Total Value Locked</h3>
                <div className="status-badge status-leading">LEADING</div>
              </div>
              <div className="metric-value text-primary-600">$2.4B</div>
              <p className="metric-description">Total collateral deposited across all pools</p>
              <div className="mt-4">
                <span className="text-sm text-muted-foreground">Rank #3 / 1,426 protocols</span>
              </div>
            </div>

            {/* Active Borrowers */}
            <div className="metric-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="metric-label">Active Borrowers</h3>
                <div className="status-badge status-growing">GROWING</div>
              </div>
              <div className="metric-value text-primary-600">127.5K</div>
              <p className="metric-description">Users actively borrowing assets</p>
              <div className="mt-4">
                <span className="text-sm text-muted-foreground">Rank #2 / 1,426 protocols</span>
              </div>
            </div>

            {/* Borrowing Volume */}
            <div className="metric-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="metric-label">Borrowing Volume</h3>
                <div className="status-badge status-moderate">MODERATE</div>
              </div>
              <div className="metric-value text-primary-600">$890M</div>
              <p className="metric-description">Total assets borrowed in last 30 days</p>
              <div className="mt-4">
                <span className="text-sm text-muted-foreground">Rank #4 / 1,426 protocols</span>
              </div>
            </div>

            {/* Health Score */}
            <div className="metric-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="metric-label">Platform Health</h3>
                <div className="status-badge status-leading">EXCELLENT</div>
              </div>
              <div className="metric-value text-success">94.2%</div>
              <p className="metric-description">Overall platform health and stability</p>
              <div className="mt-4">
                <span className="text-sm text-muted-foreground">Better than 99.8% of protocols</span>
              </div>
            </div>
          </div>
        </section>

        {/* Market Position Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Market Position & Competition</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Market Position Card */}
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Market Position</h3>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="metric-value text-primary-600 mb-2">#3 / 1,426</div>
              <p className="text-sm text-muted-foreground mb-6">Better than 99.79% of protocols</p>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Top Competitors</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Aave</span>
                    <span className="text-sm font-medium text-foreground">85.9%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill progress-primary" style={{width: '85.9%'}}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Compound</span>
                    <span className="text-sm font-medium text-foreground">76.2%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill progress-primary" style={{width: '76.2%'}}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">MakerDAO</span>
                    <span className="text-sm font-medium text-foreground">11.1%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill progress-primary" style={{width: '11.1%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Health Card */}
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Platform Health</h3>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="metric-value text-success mb-2">94.2%</div>
              <p className="text-sm text-muted-foreground mb-6">Excellent health score</p>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Health Factors</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Liquidity</span>
                    <div className="status-badge status-leading">EXCELLENT</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Security</span>
                    <div className="status-badge status-leading">SECURE</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stability</span>
                    <div className="status-badge status-leading">STABLE</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment Card */}
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Risk Assessment</h3>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="metric-value text-warning mb-2">LOW</div>
              <p className="text-sm text-muted-foreground mb-6">Overall risk level</p>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Risk Factors</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Market Risk</span>
                    <div className="status-badge status-moderate">MODERATE</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Liquidation Risk</span>
                    <div className="status-badge status-leading">LOW</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Smart Contract Risk</span>
                    <div className="status-badge status-leading">LOW</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/borrow" className="dashboard-card hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105 active:scale-95">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary-600 transition-colors">Start Borrowing</h3>
                  <p className="text-sm text-muted-foreground">Deposit collateral and borrow assets</p>
                </div>
              </div>
            </Link>

            <button className="dashboard-card hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105 active:scale-95 w-full">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center group-hover:bg-success/20 transition-colors">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-success transition-colors">View Portfolio</h3>
                  <p className="text-sm text-muted-foreground">Monitor your positions and health</p>
                </div>
              </div>
            </button>

            <button className="dashboard-card hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105 active:scale-95 w-full">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warning-light rounded-lg flex items-center justify-center group-hover:bg-warning/20 transition-colors">
                  <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-warning transition-colors">Risk Analysis</h3>
                  <p className="text-sm text-muted-foreground">Assess market and liquidation risks</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="dashboard-card bg-primary-600 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Borrowing?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of users who are already borrowing on our secure, decentralized platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/borrow">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                  Get Started Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">DB</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 DeFi Borrow Dashboard. Built with Next.js and Tailwind CSS 4.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
