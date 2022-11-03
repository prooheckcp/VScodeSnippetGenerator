local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Knit = require(ReplicatedStorage.Packages.knit)

local ${1:KnitService} = Knit.CreateService({
    Name = "${1:KnitService}",
    Client = {}
})

return ${1:KnitService}