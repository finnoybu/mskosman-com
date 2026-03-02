# Stage X.Y: [Stage Title]

## Status
- **Status**: Not Started | In Progress | Completed
- **Estimated Time**: [X-Y hours]
- **Prerequisites**: [Stage X.Y completed OR None (initial stage)]
- **Next Stage**: [Stage X.Y+1 OR TBD]
- **Date Started**: [YYYY-MM-DD]
- **Date Completed**: [YYYY-MM-DD]

---

## Objective

[1-2 paragraph summary of what this stage accomplishes and why it's important]

Focus on:
- [Primary focus area 1]
- [Primary focus area 2]
- [Primary focus area 3]

---

## Constraints

**DO NOT**:
- [Thing to avoid 1]
- [Thing to avoid 2]
- [Thing to avoid 3]

**FOCUS ON**:
- [What to prioritize 1]
- [What to prioritize 2]
- [What to prioritize 3]

---

## [Section 1: Primary Work Item]

### Current State
[Describe what exists now]

### Proposed Changes
[Describe what will change]

### Implementation

**File**: `path/to/file.ext`

[Include code examples, configuration, or detailed instructions]

```typescript
// Example code or configuration
```

### Behavior Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### Edge Cases
- [Edge case 1]
- [Edge case 2]

### Validation
- [ ] [Test/check 1]
- [ ] [Test/check 2]
- [ ] [Test/check 3]

---

## [Section 2: Secondary Work Item]

### Current State
[Describe what exists now]

### Proposed Changes
[Describe what will change]

### Implementation

**File**: `path/to/file.ext`

[Include code examples, configuration, or detailed instructions]

### Implementation Notes
- [Note or consideration 1]
- [Note or consideration 2]

### Validation
- [ ] [Test/check 1]
- [ ] [Test/check 2]

---

## [Continue with additional sections as needed]

---

## Key Files to Create/Modify

### New Files
- `path/to/new/file1.ext` - [Purpose]
- `path/to/new/file2.ext` - [Purpose]

### Modified Files
- `path/to/existing/file1.ext` - [Changes made]
- `path/to/existing/file2.ext` - [Changes made]

### Unchanged Files (for reference)
- `path/to/unchanged/file.ext` - [Why no changes needed]

---

## Acceptance Criteria

### [Category 1: e.g., Build & Type Safety]
- [ ] [Specific testable criterion]
- [ ] [Specific testable criterion]
- [ ] [Specific testable criterion]

### [Category 2: e.g., Functionality]
- [ ] [Specific testable criterion]
- [ ] [Specific testable criterion]

### [Category 3: e.g., Performance]
- [ ] [Specific metric with target value]
- [ ] [Specific metric with target value]

### [Category 4: e.g., Accessibility]
- [ ] [Specific standard or requirement]
- [ ] [Specific standard or requirement]

### No Regressions
- [ ] All existing features work
- [ ] Build succeeds
- [ ] CI passes
- [ ] No new console errors or warnings
- [ ] No layout shifts
- [ ] No performance degradation

---

## Testing Requirements

### Automated Tests

**Required Test Coverage**:
- [Type of test 1, e.g., "Unit tests for utility functions"]
- [Type of test 2, e.g., "E2E tests for critical user flows"]

**Add/Modify Tests**:

**File**: `tests/[test-name].test.ts`

```typescript
// Example test structure
describe('[Feature]', () => {
  it('[should do something specific]', () => {
    // Test implementation
  });
});
```

**Run Tests**:
```bash
npm run test
npm run test:e2e
```

### Manual Testing Checklist

#### Desktop Testing
1. [Test step 1]
2. [Test step 2]
3. [Test step 3]

#### Mobile Testing
1. [Test step 1]
2. [Test step 2]

#### Edge Cases to Test
- [Edge case scenario 1]
- [Edge case scenario 2]

### Browser Testing Matrix

**Desktop**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Mobile**:
- [ ] iOS Safari (latest)
- [ ] Android Chrome (latest)

### Performance Benchmarks

**Target Metrics**:
- Lighthouse Performance: ≥ [score]
- Lighthouse Accessibility: ≥ [score]
- Lighthouse Best Practices: ≥ [score]
- Lighthouse SEO: ≥ [score]
- Build time: < [X seconds]
- [Other metric]: [target value]

**Pages to Test**:
- `/` (homepage)
- `/[key-route-1]`
- `/[key-route-2]`

---

## Dependencies

### NPM Packages (if adding new dependencies)

```json
{
  "dependencies": {
    "[package-name]": "^[version]"
  },
  "devDependencies": {
    "[dev-package-name]": "^[version]"
  }
}
```

### External Services/APIs
- [Service name]: [Purpose] - [Link to docs if applicable]

### Configuration Files
- `[config-file.ext]`: [What needs to be configured]

---

## Git Workflow

### Branch Naming
```bash
git checkout -b stage-[X.Y]-[short-descriptor]
```

### Commit Message Format
```
stage [X.Y]: [brief description of change]

[Optional: More detailed explanation]
```

### Tag Strategy
Before starting:
```bash
git tag pre-stage-[X.Y]
```

After completion:
```bash
git tag stage-[X.Y]-complete
```

---

## Rollback Plan

### If Implementation Fails

**Branch Strategy**:
1. Work on feature branch: `stage-[X.Y]-[descriptor]`
2. Commit incrementally with clear messages
3. Tag before starting: `git tag pre-stage-[X.Y]`

**Incremental Commits** (recommended structure):
1. [First logical unit of work]
2. [Second logical unit of work]
3. [Third logical unit of work]

**If Blocking Issue Occurs**:
```bash
# Option 1: Revert specific commit
git revert [commit-hash]

# Option 2: Reset to before stage
git reset --hard pre-stage-[X.Y]

# Option 3: Cherry-pick working commits to new branch
git checkout -b stage-[X.Y]-attempt-2
git cherry-pick [working-commit-hash]
```

**Validation Before Retry**:
- [ ] Review error logs
- [ ] Identify root cause
- [ ] Adjust approach
- [ ] Test fix in isolation
- [ ] Document lesson learned

---

## Documentation Updates

### README.md
[List specific sections that need updating]
- [ ] [Section name]: [What to add/change]
- [ ] [Section name]: [What to add/change]

### Comments in Code
- [ ] Add JSDoc comments to new functions
- [ ] Update component prop documentation
- [ ] Document complex logic with inline comments

### Architecture Decision Records (if applicable)
- [ ] Create ADR for [significant decision]
- [ ] Update existing ADR for [changed decision]

---

## Success Metrics

### Quantitative
- [Metric 1]: [Baseline] → [Target]
- [Metric 2]: [Baseline] → [Target]
- [Metric 3]: [Baseline] → [Target]

### Qualitative
- [Goal 1 achieved]
- [Goal 2 achieved]
- [Goal 3 achieved]

---

## Known Issues & Future Work

### Known Limitations
- [Limitation 1]: [Why it exists, when it might be addressed]
- [Limitation 2]: [Why it exists, when it might be addressed]

### Follow-up Work Required
- [Future task 1]: [Brief description] (Stage X.Y+1)
- [Future task 2]: [Brief description] (Stage X.Y+2)

### Technical Debt Introduced (if any)
- [Debt item 1]: [Why it was necessary, plan to resolve]
- [Debt item 2]: [Why it was necessary, plan to resolve]

---

## Resources & References

### Documentation
- [Resource name]: [URL or file path]
- [Standard/Spec name]: [URL]

### Tools
- [Tool name]: [Purpose] - [URL]

### Related Stages
- [Stage X.Y]: [How it relates]
- [Stage X.Y]: [How it relates]

---

## Review Checklist (Before Marking Complete)

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Code follows project style guide
- [ ] Complex logic documented
- [ ] No hardcoded values (use constants)
- [ ] No console.log statements left in production code

### Testing
- [ ] All automated tests pass
- [ ] Manual testing checklist completed
- [ ] Cross-browser testing done
- [ ] Mobile testing completed
- [ ] Edge cases tested

### Performance
- [ ] Lighthouse scores meet targets
- [ ] Build time acceptable
- [ ] No unnecessary re-renders (if React/UI)
- [ ] Images optimized
- [ ] Bundle size acceptable

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader tested (if applicable)
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] ARIA labels where appropriate

### Documentation
- [ ] README updated
- [ ] Code comments added
- [ ] Acceptance criteria met
- [ ] Known issues documented

### CI/CD
- [ ] All CI checks pass
- [ ] No breaking changes to deployment
- [ ] Environment variables documented (if added)

### Security
- [ ] No sensitive data exposed
- [ ] Dependencies scanned for vulnerabilities
- [ ] User input sanitized (if applicable)

---

## Notes

[Space for additional notes, discoveries, or context during implementation]

- [Note 1]
- [Note 2]
- [Note 3]
