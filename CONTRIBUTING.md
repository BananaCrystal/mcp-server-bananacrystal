# Contributing to BananaCrystal MCP Server

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/BananaCrystal/mcp-server-bananacrystal/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, Node version, etc.)
   - Error messages or logs

### Suggesting Features

1. Check if the feature has been suggested
2. Create an issue describing:
   - The problem it solves
   - Proposed solution
   - Alternative solutions considered
   - Impact on existing functionality

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/mcp-server-bananacrystal.git
cd mcp-server-bananacrystal

# Install dependencies
npm install

# Build
npm run build

# Start mock server — no API key needed, all 40 tools return realistic data
npm run mock

# Or run in development mode against the real API
export BANANACRYSTAL_API_KEY=bc_test_your_sandbox_key
npm run dev
```

## Code Style

- Use TypeScript
- Follow existing code style
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

## Testing

- Test your changes manually
- Ensure existing functionality still works
- Add tests for new features (when test framework is added)

## Documentation

- Update README.md if adding features
- Add JSDoc comments for public APIs
- Include usage examples

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add support for batch transfers
fix: handle network timeout errors
docs: update installation instructions
refactor: simplify error handling
```

## Questions?

- Open an issue for questions
- Email: support@bananacrystal.com

Thank you for contributing! 🎉
