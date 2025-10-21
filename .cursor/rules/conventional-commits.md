# Conventional Commit Rules

## Commit Message Format

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Required Types

Use one of these conventional commit types:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Examples

### Good Examples
```
feat: add user authentication system
fix: resolve memory leak in data processing
docs: update API documentation
style: format code according to prettier rules
refactor: extract common validation logic
test: add unit tests for user service
chore: update dependencies
```

### Bad Examples
```
update stuff
fixed bug
changes
WIP
```

## Guidelines

1. **Type is required** - Always start with a conventional type
2. **Use lowercase** - Type and scope should be lowercase
3. **No period** - Don't end the description with a period
4. **Imperative mood** - Use imperative mood ("add feature" not "added feature")
5. **Be descriptive** - The description should clearly explain what changed
6. **Limit length** - Keep the first line under 50 characters when possible
7. **Use body for details** - Use the body to explain the "what" and "why" for complex changes

## Scope (Optional)

Use scope to indicate the area of the codebase affected:
- `feat(auth): add OAuth integration`
- `fix(api): handle null response`
- `docs(readme): update installation instructions`

## Breaking Changes

Use `!` after the type/scope to indicate breaking changes:
- `feat!: remove deprecated API`
- `feat(api)!: change response format`

Or use `BREAKING CHANGE:` in the footer:
```
feat: add new configuration option

BREAKING CHANGE: The old config format is no longer supported
```
