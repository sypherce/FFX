--[[size = 0xF90
public struct BattleEntityData
{
[MarshalAs(UnmanagedType.I4)]
public int pointer_1;

public int index_1;
public int index_2;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 60)]
public byte[] unknown_1;

public int pointer_2;
public int pointer_3;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 64)]
public byte[] text_name;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 256)]
public byte[] text_help;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 512)]
public byte[] text_scan;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 88)]
public byte[] unknown_2;

[MarshalAs(UnmanagedType.U1)]
public byte unknown_9;

[MarshalAs(UnmanagedType.U1)]
public byte unknown_10;

[MarshalAs(UnmanagedType.U1)]
public byte animation_start;

[MarshalAs(UnmanagedType.U1)]
public byte unknown_11; // freezes animation when != 0

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 9)]
public byte[] unknown_12; // 9

[MarshalAs(UnmanagedType.U1)]
public byte animation_speed;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 414)]
public byte[] unknown_8;

[MarshalAs(UnmanagedType.U4)]
public int hp_max;

[MarshalAs(UnmanagedType.U4)]
public int mp_max;

[MarshalAs(UnmanagedType.U4)]
public int hp_max2;

[MarshalAs(UnmanagedType.U4)]
public int mp_max2;

[MarshalAs(UnmanagedType.U4)]
public int overkill;

[MarshalAs(UnmanagedType.U1)]
public byte strength;

[MarshalAs(UnmanagedType.U1)]
public byte defense;

[MarshalAs(UnmanagedType.U1)]
public byte magic;

[MarshalAs(UnmanagedType.U1)]
public byte magic_defense;

[MarshalAs(UnmanagedType.U1)]
public byte agility;

[MarshalAs(UnmanagedType.U1)]
public byte luck;

[MarshalAs(UnmanagedType.U1)]
public byte evasion;

[MarshalAs(UnmanagedType.U1)]
public byte accuracy;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 12)]
public byte[] unknown_3;

[MarshalAs(UnmanagedType.U1)]
public byte overdrive_current;

[MarshalAs(UnmanagedType.U1)]
public byte overdrive_max;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 10)]
public byte[] unknown_4;

[MarshalAs(UnmanagedType.U1)]
public byte timer_doom;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 7)]
public byte[]  unknown_14;

[MarshalAs(UnmanagedType.U4)]
public int hp_current;

[MarshalAs(UnmanagedType.U4)]
public int mp_current;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 40)]
public byte[] unknown_5;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 6)]
public byte[] unknown_6;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 2)]
public byte[] status_flags_negative;

[MarshalAs(UnmanagedType.U1)]
public byte status_turns_sleep;

[MarshalAs(UnmanagedType.U1)]
public byte status_turns_silence;

[MarshalAs(UnmanagedType.U1)]
public byte status_turns_darkness;

[MarshalAs(UnmanagedType.U1)]
public byte status_shell;

[MarshalAs(UnmanagedType.U1)]
public byte status_protect;

[MarshalAs(UnmanagedType.U1)]
public byte status_reflect;

[MarshalAs(UnmanagedType.U1)]
public byte status_nultide;

[MarshalAs(UnmanagedType.U1)]
public byte status_nulblaze;

[MarshalAs(UnmanagedType.U1)]
public byte status_nulshock;

[MarshalAs(UnmanagedType.U1)]
public byte status_nulfrost;

[MarshalAs(UnmanagedType.U1)]
public byte status_regen;

[MarshalAs(UnmanagedType.U1)]
public byte status_haste;

[MarshalAs(UnmanagedType.U1)]
public byte status_slow;

[MarshalAs(UnmanagedType.U1)]
public byte status_unknown;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 2)]
public byte[] status_flags_positive;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 176)]
public byte[] unknown_7;

[MarshalAs(UnmanagedType.U2)]
public ushort action_defend;

[MarshalAs(UnmanagedType.ByValArray, SizeConst = 110)]
public byte[] unknown_13;

[MarshalAs(UnmanagedType.U1)]
public byte battle_row;
}
--]]

base_dir = "../assets/"

gil_addr = 0xD307D8
gil_filename = "gil.txt"

time_addr = 0xD2CB4C
time_filename = "time.txt"

battle_addr = 0xD334CC
battle_filename = "battle.txt"

hp_addr = 0xD32078
mp_addr = 0xD3207C

hp_max_addr = hp_addr + 8
mp_max_addr = mp_addr + 8
slvl_addr = 0xD32097
tslvl_addr = 0xD32098
function char_calc(addr, number)
	return addr + (0x94 * number)
end
local character_names = {"tidus", "yuna", "auron", "kimahri", "wakka", "lulu", "rikku"}
function char_base_file(number)
	return base_dir .. character_names[number + 1] .. ".txt"
end
function char_file(file, number)
	return base_dir .. character_names[number + 1] .. "/" .. file .. ".txt"
end
