local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.knit)

local ${1:KnitController} = Knit.CreateController({
    Name = "${1:KnitController}",
    Client = {}
})

return ${1:KnitController}