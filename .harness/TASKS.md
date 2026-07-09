# Task Registry

**Last Updated**: 2026-07-09  
**Total Tasks**: 66  
**Completed**: 24  
**In Progress**: 0  
**Blocked**: 0  
**Cancelled**: 5

---

## Task Index

### Wave 1: Backend Foundation

| ID     | Priority | Phase | Status | Title                                  | Depends On     | Folder                  | Projects      |
| ------ | -------- | ----- | ------ | -------------------------------------- | -------------- | ----------------------- | ------------- |
| T-0001 | P1       | Done  | Done   | Backend env config mở rộng             | -              | [T-0001](tasks/T-0001/) | nestjs_prisma |
| T-0002 | P1       | Done  | Done   | Prisma schema mở rộng cho booking flow | T-0001         | [T-0002](tasks/T-0002/) | nestjs_prisma |
| T-0003 | P1       | Done  | Done   | Redis connection và cache service      | T-0001         | [T-0003](tasks/T-0003/) | nestjs_prisma |
| T-0004 | P1       | Done  | Done   | WebSocket gateway cơ bản               | T-0001, T-0003 | [T-0004](tasks/T-0004/) | nestjs_prisma |
| T-0005 | P1       | Done  | Done   | API response format và error handling  | -              | [T-0005](tasks/T-0005/) | nestjs_prisma |
| T-0031 | P1       | Done  | Done   | Google Maps routing service backend    | T-0003         | [T-0031](tasks/T-0031/) | nestjs_prisma |

## Legend

- **Column order**: `ID | Priority | Phase | Status | Title | Depends On | Folder | Projects`
- **Priority**: P0 (blocker) | P1 (high) | P2 (normal) | P3 (low)
- **Phase**: Created | Planning | Contracting | Implementing | Evaluating | Fixing | Reviewing | Closing | Done
- **Status**: Planned | In Progress | Blocked | Done | Cancelled
