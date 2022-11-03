local $1 = {}
$1.__index = $1

function $1.new()
    local self = setmetatable({}, $1)

    return self
end

return $1