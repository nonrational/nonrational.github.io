---
layout: post
title: My Favorite `git` Aliases
---

<img src='image.png' alt='A photo of a cat.'  />



I saw [this post from @b0rk](https://social.jvns.ca/@b0rk/111947630524025209) a while back, and figured I'd share my own favorite `git` aliases. Gary Bernhardt was the original inspiration for my config back in 2012, and I've been tweaking it ever since.

All these aliases are in my `~/.gitconfig` file, available at [nonrational/dotfiles](https://github.com/nonrational/dotfiles).

## Alias Groups

### Short Core Commands

There are ~6 commands that I use dozens of times a day, and I've shortened them to 1-2 characters each.

```sh
git st  # `status`
git ci  # `commit`
git aa  # `add --all`
git co  # `checkout`
git pp  # `push`
git f   # `fetch --tags --prune`
```

### Pretty Logs

The value of `log --graph` has been diminished since I started using squashed merge commits, but it's still immensely helpful when

```sh
git r
git l
git ra
git la
```

### Working with PRs

```sh
git pro  # Pull Request Open - Open the current branch's PR in the browser, using `hub`.
git rio  # Rebase Interactive Origin - Rebase the current branch interactively against `origin/main`.
```

### Working with Branches

```sh
git bcp  # Branch Copy - Copy the current branch branch name to the clipboard.
git bmx  # Branch Move Pattern - Apply a sed-like command to rename the current branch.
git buu  # Branch Unset Upstream - Unset the upstream for the current branch, if renaming a branch post-push.
```

### More "Ignore" Options

Sometimes I want to preserve a change locally that I never intend to commit.

```sh
git disregard  # Ignore any changes to a tracked file.
git dissed     # List all files that have been disregarded.
git attend     # Stop ignoring changes to a file that was previously disregarded.

git is-it-just-me # Ignore an untracked file without adding it to `.gitignore`.
```

### Keep Things Tidy

I often work on several branches at the same time and stale branches inevitably clutter up my local environment.

```sh
git broom            # Remove all local branches with my personal prefix that do not exist on origin.
git spring-cleaning  # Remove all branches with my personal prefix, both remote and local.
git everybody-out    # Remove all local branches that do not begin with my personal prefix.
```


## Frequency Analysis

```sh
# Print my top 50 most frequently used `git` commands
history | awk '/ git / {print $2,$3}' | grep git | sort | uniq -c | sort -r | head -n30
```

My top 30 git commands, with aliases explained.

```sh
6388 git st      # Fewer characters to type than `status`.
1619 git ci      # Fewer characters to type than `commit`.
1545 git r       # Show the last 10 commits with `pretty_git_log`.
1507 git aa      # Stage all changes in the current directory and subdirectories.
1469 git co      # Fewer characters to type than `checkout`.
1277 git pp      # Fewer characters to type than `push`.
 932 git up      # Use `hub sync` to fetch and fast-forward *all* local branches, not just the current one.
 434 git f       # Fetch everything from origin, including tags, and prune deleted branches.
 287 git diff
 250 git reset
 241 git push
 211 git nuke    # Unstage and discard all changes, including deleting untracked files.
 177 git merge
 173 git add
 141 git rio     # Rebase the current branch interactively against origin/main.
 139 git branch
 132 git aww     # Stage all modified or added files matching a pattern.
 131 git stash
 126 git sww     # Switch to a branch matching a pattern.
  99 git pull
  90 git amend   # Fewer characters to type than `commit --amend`.
  86 git grep
  85 git dfo     # List only the files that differ between the current HEAD and origin/main.
  82 git lb      # List local branches with a relative modified date, recently modified first.
  81 git broom   # Remove all local branches that do not exist on origin.
  78 git ri      # Fewer characters to type than `rebase --interactive`.
  56 git rebase
  53 git show
  45 git l       # Show a paginated log with `pretty_git_log`.
  26 git brr     # List local branches, recently modified first.
  20 git df      # Fewer characters to type than `diff --name-only`.
```

## Workflow Examples

List the branches that I've been working on recently and switch to one of them based on a pattern.

```sh
host:project(anorton/sc-202/fix-misc-bugs)$ git brr
  main
  anorton/sc-111/upgrade-dependencies
* anorton/sc-202/fix-misc-bugs
  aln/feature-reset-on-failure
  aln/remove-obsolete-graph

host:project(anorton/sc-202/fix-misc-bugs)$ git sww graph
Switched to branch 'aln/remove-obsolete-graph'

host:project(aln/remove-obsolete-graph)$ git dfo | xargs code
```

Fix a commit typo before pushing.

```sh
git commit -m'Fix tpyo'
git amend -m'Fix typo'
```
