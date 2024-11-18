---
layout: post
title: my favorite git aliases
---

1. `git co` - checkout
2. `git f` - fetch everything (including tags) from origin
3. `git up` - fetch and update all local branches. if you're on a feature branch, `main` will be updated locally.
4. `git reset` - unstage all changes
5. `git push` - push current branch to origin
6. `git nuke` - unstage and discard all changes, including untracked files
7. `git merge` - merge the specified branch into the current branch
8. `git add` - stage changes in a particular file or directory
9. `git rio` - rebase interactive with origin/main
10. `git branch` - list all branches
11. `git stash` - stash changes
12. `git aww` - Stage changes in files matching a pattern. "Add where wildcard"
13. `git sww` - "Switch where wildcard" - checkout a branch matching a pattern
14. `git pull` - pull changes from origin
15. `git checkout` - checkout a branch
16. `git amend` - short for `commit --amend`
17. `git grep` - search for a pattern in the working directory
18. `git dfo` - List the files that differ between the current HEAD and origin/main
19. `git broom` - remove all local branches that do not exist on origin
20. `git lb` - list local branches, sorted by the last modified date.
21. `git ri` - rebase interactive against a specified ref


## Combos

`git lb` + `git sww` - List the branches that I've been working on recently and switch to one of them based on a keyword.

`

```
1046 git co
 430 git f
 284 git up;
 250 git reset
 241 git push
 211 git nuke
 177 git merge
 170 git add
 140 git rio
 138 git branch
 131 git stash
 130 git aww
 123 git sww
  99 git pull
  95 git checkout
  90 git amend
  86 git grep
  85 git dfo
  81 git diff
  81 git broom
  80 git lb
  78 git ri
  66 git b
  59 git t
  56 git rebase
  52 git show
  49 git s
  44 git l
  40 git ci
  34 git rev-parse
  25 git brr
  20 git revert
  20 git df
  19 git cherry-pick
  18 git log
  17 git p
  16 gitst
  16 git
  14 git git
  13 git modified
  12 git a
  11 git untracked
  11 git clone
  10 gits t
  10 git remote
  10 git i
   9 git tag
   8 git u
   8 git buu
   8 git browse
```
