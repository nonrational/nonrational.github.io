---
layout: post
title: Cleanup Patterns in Go
---

Let's talk about `defer`.

# Returned Deferral

```go
package cleanup_test;

func TestInsideWorkingDirectory(t *testing.T){
	defer SetWorkingDirectory("/path/to/directory")()

	cwd, _ := os.Getwd()
	assert.Equal(t, cwd, "/path/to/directory")
}

func SetWorkingDirectory(path string) func() {
	if statInfo, err := os.Stat(path); os.IsNotExist(err) || !statInfo.IsDir() {
		panic(err)
	}

  originalPath, err := os.Getwd()

  if err != nil {
		panic(err)
	}

	if err := os.Chdir(path); err != nil {
		panic(err)
	}

	return func(){
		if err := os.Chdir(originalPath); err != nil {
			panic(err)
		}
	}
}
```

# Continuation Passing

```go
package cleanup_test;

func TestInsideWorkingDirectory(t *testing.T){
	WithWorkingDirectory("/path/to/directory", func(){
		cwd, _ := os.Getwd()
		assert.Equal(t, cwd, "/path/to/directory")
	})
}

func WithWorkingDirectory(path string, f func()) {
	if statInfo, err := os.Stat(path); os.IsNotExist(err) || !statInfo.IsDir() {
		panic(err)
	}

	originalPath, err := os.Getwd()

	if err != nil {
		panic(err)
	}

	if err := os.Chdir(path); err != nil {
		panic(err)
	}

	f()

	if err := os.Chdir(originalPath); err != nil {
		panic(err)
	}
}
```
