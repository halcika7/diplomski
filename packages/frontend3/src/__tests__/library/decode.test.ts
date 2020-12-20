import { AuthToken } from '../../library/decode';

const t =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2ZhZjkzZWRmNzM3YjE4ZGZlYzExMiIsInJvbGUiOiJwcm9mZXNzb3IiLCJ5ZWFyIjoyMDIwLCJpYXQiOjE2MDgyOTE0NTAsImV4cCI6MTYwODI5MjM1MH0.4ihN-wyrfN0qVyOxs9QcGp6aHPY_nS1Agvhwya3wCRY';

describe('Testing AuthToken', () => {
  it('should return id = null', () => {
    const data = AuthToken.getTokenData('123');

    expect(data.id).toBe(null);
  });

  it('should return id != null', () => {
    const data = AuthToken.getTokenData(t);

    expect(data.id).not.toBe(null);
  });

  it('should return role', () => {
    const role = AuthToken.getRole(t);

    expect(role).toBeTruthy();
  });
});
