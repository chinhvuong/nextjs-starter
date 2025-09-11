# DeFi Borrow App

A modern, decentralized borrowing application built with Next.js 14, Tailwind CSS 4, and TypeScript. This application allows users to use their crypto assets as collateral to borrow stablecoins and other digital assets.

## 🚀 Features

- **Wallet Integration**: Connect with MetaMask and other Web3 wallets
- **Multi-Chain Support**: Ethereum, Polygon, Arbitrum, and Optimism
- **Token Selection**: Choose from a variety of collateral and borrow tokens
- **Real-time Validation**: Form validation with instant feedback
- **Collateral Ratio Monitoring**: Track your borrowing health in real-time
- **Responsive Design**: Beautiful UI that works on all devices
- **Type Safety**: Full TypeScript support throughout the application

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS 4 with custom theme system
- **Language**: TypeScript
- **State Management**: React Context + Custom Hooks
- **Web3**: Ethers.js for blockchain interactions
- **UI Components**: Custom component library with Tailwind CSS
- **Form Handling**: Custom validation and state management

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── borrow/                    # Borrow feature route
│       ├── page.tsx               # Route entry for borrow
│       ├── guard.tsx              # Wallet connect guard
│       └── meta.ts                # SEO metadata
│
├── features/                      # Feature-based UI modules
│   ├── borrow/
│   │   ├── borrow-page.tsx        # UI composition
│   │   ├── components/            # Feature-specific components
│   │   ├── hooks/                 # Custom hooks
│   │   ├── contexts/              # React contexts
│   │   ├── services/              # Business logic
│   │   ├── constants.ts           # Feature constants
│   │   └── types.ts               # TypeScript types
│
├── contracts/                     # ABIs & contract utilities
│   ├── aave/                      # Aave V3 integration
│   ├── uniswap/                   # Uniswap V3 integration
│   └── compound/                  # Compound V3 integration
│
├── config/                        # Frontend configuration
│   ├── chains.ts                  # Supported networks
│   ├── tokens.ts                  # Supported tokens
│   ├── contracts.ts               # Contract addresses & ABIs
│   └── index.ts                   # Main config export
│
├── shared/                        # Shared UI & utilities
│   ├── components/                # Reusable UI elements
│   ├── hooks/                     # Common hooks
│   ├── utils/                     # Helper functions
│   ├── constants.ts               # Shared constants
│   └── types.ts                   # Shared types
│
└── styles/                        # CSS & Tailwind configuration
    ├── globals.css                # Global styles
    ├── theme.css                  # Tailwind v4 theme
    └── tailwind.css               # Tailwind imports
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or other Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-nextjs-starter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_DEFAULT_CHAIN_ID=1
NEXT_PUBLIC_SUPPORTED_CHAINS=1,137,42161,10
```

### Tailwind CSS 4

The project uses Tailwind CSS 4 with a custom theme system. Theme variables are defined in `src/styles/theme.css` and can be customized to match your brand.

### Supported Networks

- **Ethereum Mainnet** (Chain ID: 1)
- **Polygon** (Chain ID: 137)
- **Arbitrum One** (Chain ID: 42161)
- **Optimism** (Chain ID: 10)

### Supported Tokens

- **Collateral**: ETH, WBTC, WETH
- **Borrow**: USDC, USDT, DAI

## 📱 Usage

### Connecting Wallet

1. Click "Connect Wallet" on the landing page
2. Approve the connection in your MetaMask
3. Ensure you're on a supported network

### Borrowing Assets

1. Navigate to `/borrow`
2. Select your collateral token and amount
3. Choose the token you want to borrow
4. Set your borrow amount
5. Choose interest rate mode (stable or variable)
6. Review the transaction summary
7. Confirm and sign the transaction

## 🏗️ Development

### Adding New Features

1. Create a new feature directory under `src/features/`
2. Follow the established pattern with components, hooks, services, etc.
3. Add the feature to the routing system
4. Update the configuration files as needed

### Component Development

- Use the shared component library for consistency
- Follow the established naming conventions
- Implement proper TypeScript interfaces
- Add comprehensive error handling

### Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS team for the utility-first CSS framework
- The DeFi community for inspiration and feedback
- All contributors who help improve this project

---

Built with ❤️ by the DeFi Borrow App Team
