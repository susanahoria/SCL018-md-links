import {
  mdLinks,
  readLinks,
  readUserFile,
  validateLinks,
  isMdFile,
} from "../index.js";

describe("mdLinks", () => {
  it("should be a function", () => {
    expect(typeof mdLinks).toBe("function");
  });
  it("should return a promise", () => {
    const path = "testing.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("readLinks", () => {
  it("should be a function", () => {
    expect(typeof readLinks).toBe("function");
  });
  it("should return an array", () => {
    const path = "testing.md";
    const result = readLinks(path);
    expect(result).toBeInstanceOf(Array);
  });
});

describe("readUserFile", () => {
  it("should be a function", () => {
    expect(typeof readUserFile).toBe("function");
  });
  it("should return a promise", () => {
    const path = "testing.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("validateLinks", () => {
  it("should be a function", () => {
    expect(typeof validateLinks).toBe("function");
  });
  it("should return a promise", () => {
    const path = "testing.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("isMdFile", () => {
  it("should be a function", () => {
    expect(typeof isMdFile).toBe("function");
  });
  it("should return an object", () => {
    const path = "testing.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Object);
  });
});

//NODE_OPTIONS=--experimental-vm-modules npx jest
//"es lo unico que sirve para ejecutar test :( God damn it"
