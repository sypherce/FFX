local memreader = require('memreader')
local bit32 = require('bit32')

--defines
dofile('characters.lua')
local process_name = 'FFX.exe'
local process = nil
	for pid, name in memreader.processes() do
		if name == process_name then
			process = memreader.openprocess(pid)
			break;
		end
	end
	if process == nil then
		print (process_name .. " is not open!")
		return
	end

local function stringtobytes(string_content, byte_count)
	if byte_count < 0 or byte_count > 4 then
		return nil
	end

	local value = string.byte(string_content,1)
	if byte_count >= 2 then
		value = value + bit32.lshift(string.byte(string_content, 2) ,8) ;
	end
	if byte_count >= 3 then
		value = value + bit32.lshift(string.byte(string_content, 3), 16) ;
	end
	if byte_count == 4 then
		value = value + bit32.lshift(string.byte(string_content, 4), 24) ;
	end

	return value
end
local function read_bytes(addr, length)
	local string_ = process:read(process.base + addr, length)
	return stringtobytes(string_, length)
end
local function SecondsToClock(seconds)
  local seconds = tonumber(seconds)

  if seconds <= 0 then
    return "00:00:00";
  else
    hours = string.format("%02.f", math.floor(seconds/3600));
    mins = string.format("%02.f", math.floor(seconds/60 - (hours*60)));
    secs = string.format("%02.f", math.floor(seconds - hours*3600 - mins *60));
    return hours..":"..mins..":"..secs
  end
end

local function write_value(filename, value)
	local file = io.open(filename, "w")
		io.output(file)
		io.write(value)
		io.close(file)
end

local function export_character(number)
	local hp_value     = read_bytes(char_calc(hp_addr,     number), 4)
	local hp_max_value = read_bytes(char_calc(hp_max_addr, number), 4)
	local mp_value     = read_bytes(char_calc(mp_addr,     number), 4)
	local mp_max_value = read_bytes(char_calc(mp_max_addr, number), 4)
	local slvl_value   = read_bytes(char_calc(slvl_addr,   number), 1)
	local tslvl_value  = read_bytes(char_calc(tslvl_addr,  number), 1)

	local value = hp_value .. '\n' .. mp_value.. '\n' .. slvl_value --.. '\n' .. tslvl_value

	write_value(char_file("curr_hp", number), hp_value)
	write_value(char_file("max_hp", number), hp_max_value)
	write_value(char_file("curr_mp", number), mp_value)
	write_value(char_file("max_mp", number), mp_max_value)
	write_value(char_file("slvl", number), slvl_value)
	write_value(char_file("tslvl", number), tslvl_value)
	--write_value(char_base_file(number), value)

	return value
end

local function export_integer(integer, length, filename)
	local value = read_bytes(integer, length)
	write_value(base_dir .. filename, value)

	return value
end
local function export_time(integer, filename)
	local value = read_bytes(integer, 4)
	write_value(base_dir .. filename, SecondsToClock(value))

	return value
end

local function main_loop()
	export_integer(gil_addr, 4, gil_filename);
	export_integer(battle_addr, 4, battle_filename);
	export_time(time_addr, time_filename);
	for i = 0,6,1
	do
		export_character(i);
	end
end
print ("loaded")

function sleep (a)
	local sec = tonumber(os.clock() + a);
	while (os.clock() < sec) do
	end
end

while (true) do
	main_loop()
	sleep(1)
end

print ("exit")
