import { TestBed } from "@angular/core/testing";
import { CanActivateFn } from "@angular/router";

import { noAuthGuardGuard } from "./guest.guard";

describe("noAuthGuardGuard", () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => noAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });
});
