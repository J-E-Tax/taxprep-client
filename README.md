## Workflows

Git
## update your main branch
git checkout main

git pull --rebase upstream main OR git pull origin main

## start work on a feature
git checkout -b feature-branch (to create a "feature" branch to keep it away from the main branch, which keeps the work isolated and organized.)

# write code, commit
git add . (for all files)

git add xxx.jsx (for xxx.jsx only)

git commit -m “”

## push to a feature branch
git push origin feature-branch or git push -u origin feature-branch (the -u flag adds it as a remote tracking branch)

## make a pull request on GitHub
Go on to the github organization repo and make a pull request
## if pull request is rejected
## fix bugs, commit
git add .

git commit

git pull --rebase upstream main

git push origin feature-branch

## make a pull request on GitHub

## if pull request is accepted
git checkout master

git pull --rebase upstream main

git branch -d feature-branch

## review team member’s pull request (branch)
If the team member wanted, they could pull eric-feature into their local repository and work on it on his own. Any commits he added would also show up in the pull request. This process will results in a merge commit. Once the team member is ready to accept the pull request, they needs to merge the feature into the stable project (this can be done by any one on the team)

They can do to review the branch:
git fetch origin

git checkout eric-feature
