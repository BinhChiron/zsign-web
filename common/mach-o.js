// Equivalent to `typedef int` in C++
const cpu_type_t = Number;
const cpu_subtype_t = Number;
const vm_prot_t = Number;

// Capability bits used in the definition of cpu_type.
const CPU_ARCH_MASK = 0xff000000;  // mask for architecture bits
const CPU_ARCH_ABI64 = 0x01000000;  // 64 bit ABI
const CPU_ARCH_ABI64_32 = 0x02000000;  // 64 bit ABI for 32-bit CPU

// Machine types known by all.
const CPU_TYPE_ANY = -1
const CPU_TYPE_VAX = 1
const CPU_TYPE_MC680x0 = 6
const CPU_TYPE_X86 = 7
const CPU_TYPE_I386 = CPU_TYPE_X86		/* compatibility */
const CPU_TYPE_MIPS = 8
const CPU_TYPE_MC98000 = 10
const CPU_TYPE_HPPA = 11
const CPU_TYPE_ARM = 12
const CPU_TYPE_MC88000 = 13
const CPU_TYPE_SPARC = 14
const CPU_TYPE_I860	= 15
const CPU_TYPE_ALPHA = 16
const CPU_TYPE_POWERPC = 18
const CPU_TYPE_X86_64 = (CPU_TYPE_X86 | CPU_ARCH_ABI64)
const CPU_TYPE_ARM64 = (CPU_TYPE_ARM | CPU_ARCH_ABI64)
const CPU_TYPE_ARM64_32 = (CPU_TYPE_ARM | CPU_ARCH_ABI64_32)
const CPU_TYPE_POWERPC64 = (CPU_TYPE_POWERPC | CPU_ARCH_ABI64)

// Machine subtypes (these are defined here, instead of in a machine
// dependent directory, so that any program can get all definitions
// regardless of where is it compiled).

// * Capability bits used in the definition of cpu_subtype.
// * Define CPU subtype masks and flags
const CPU_SUBTYPE_MASK = 0xff000000;  // mask for feature flags
const CPU_SUBTYPE_LIB64 = 0x80000000;  // 64 bit libraries

// Object files that are hand-crafted to run on any
// implementation of an architecture are tagged with
// CPU_SUBTYPE_MULTIPLE.  This functions essentially the same as
// the "ALL" subtype of an architecture except that it allows us
// to easily find object files that may need to be modified
// whenever a new implementation of an architecture comes out.
// 
// It is the responsibility of the implementor to make sure the
// software handles unsupported implementations elegantly.
// Define machine subtypes
const CPU_SUBTYPE_MULTIPLE = -1;
const CPU_SUBTYPE_LITTLE_ENDIAN = 0;
const CPU_SUBTYPE_BIG_ENDIAN = 1;  // Big Endian

// I386 subtypes

function CPU_SUBTYPE_INTEL(f, m) {
    return (f) + ((m) << 4);
}

const CPU_SUBTYPE_I386_ALL       = CPU_SUBTYPE_INTEL(3, 0)
const CPU_SUBTYPE_386            = CPU_SUBTYPE_INTEL(3, 0)
const CPU_SUBTYPE_486            = CPU_SUBTYPE_INTEL(4, 0)
const CPU_SUBTYPE_486SX          = CPU_SUBTYPE_INTEL(4, 8)	// 8 << 4 = 128
const CPU_SUBTYPE_586            = CPU_SUBTYPE_INTEL(5, 0)
const CPU_SUBTYPE_PENT           = CPU_SUBTYPE_INTEL(5, 0)
const CPU_SUBTYPE_PENTPRO        = CPU_SUBTYPE_INTEL(6, 1)
const CPU_SUBTYPE_PENTII_M3      = CPU_SUBTYPE_INTEL(6, 3)
const CPU_SUBTYPE_PENTII_M5      = CPU_SUBTYPE_INTEL(6, 5)
const CPU_SUBTYPE_CELERON        = CPU_SUBTYPE_INTEL(7, 6)
const CPU_SUBTYPE_CELERON_MOBILE = CPU_SUBTYPE_INTEL(7, 7)
const CPU_SUBTYPE_PENTIUM_3      = CPU_SUBTYPE_INTEL(8, 0)
const CPU_SUBTYPE_PENTIUM_3_M    = CPU_SUBTYPE_INTEL(8, 1)
const CPU_SUBTYPE_PENTIUM_3_XEON = CPU_SUBTYPE_INTEL(8, 2)
const CPU_SUBTYPE_PENTIUM_M      = CPU_SUBTYPE_INTEL(9, 0)
const CPU_SUBTYPE_PENTIUM_4      = CPU_SUBTYPE_INTEL(10, 0)
const CPU_SUBTYPE_PENTIUM_4_M    = CPU_SUBTYPE_INTEL(10, 1)
const CPU_SUBTYPE_ITANIUM        = CPU_SUBTYPE_INTEL(11, 0)
const CPU_SUBTYPE_ITANIUM_2      = CPU_SUBTYPE_INTEL(11, 1)
const CPU_SUBTYPE_XEON           = CPU_SUBTYPE_INTEL(12, 0)
const CPU_SUBTYPE_XEON_MP        = CPU_SUBTYPE_INTEL(12, 1)

function CPU_SUBTYPE_INTEL_FAMILY(x) {
    return (x) & 15;
}
const CPU_SUBTYPE_INTEL_FAMILY_MAX = 15;

function CPU_SUBTYPE_INTEL_MODEL(x) {
    return (x) >> 4;
}
const CPU_SUBTYPE_INTEL_MODEL_ALL = 0;

const CPU_SUBTYPE_X86_ALL = 3
const CPU_SUBTYPE_X86_64_ALL = 3
const CPU_SUBTYPE_X86_ARCH1 = 4
const CPU_SUBTYPE_X86_64_H = 8

const CPU_SUBTYPE_ARM_ALL = 0
const CPU_SUBTYPE_ARM_A500_ARCH = 1
const CPU_SUBTYPE_ARM_A500 = 2
const CPU_SUBTYPE_ARM_A440 = 3
const CPU_SUBTYPE_ARM_M4 = 4
const CPU_SUBTYPE_ARM_V4T = 5
const CPU_SUBTYPE_ARM_V6 = 6
const CPU_SUBTYPE_ARM_V5 = 7
const CPU_SUBTYPE_ARM_V5TEJ = 7
const CPU_SUBTYPE_ARM_XSCALE = 8
const CPU_SUBTYPE_ARM_V7 = 9
const CPU_SUBTYPE_ARM_V7S = 11
const CPU_SUBTYPE_ARM_V7K = 12
const CPU_SUBTYPE_ARM_V8 = 13
const CPU_SUBTYPE_ARM_V6M = 14
const CPU_SUBTYPE_ARM_V7M = 15
const CPU_SUBTYPE_ARM_V7EM = 16

const CPU_SUBTYPE_ARM64_ALL = 0
const CPU_SUBTYPE_ARM64_V8 = 1
const CPU_SUBTYPE_ARM64E = 2
const CPU_SUBTYPE_ARM64_32_V8 = 1

const FAT_MAGIC = 0xcafebabe
const FAT_CIGAM = 0xbebafeca

const MH_MAGIC = 0xfeedface
const MH_CIGAM = 0xcefaedfe
const MH_MAGIC_64 = 0xfeedfacf
const MH_CIGAM_64 = 0xcffaedfe


// Constants for the cmd field of new load commands, the type

const MH_OBJECT = 0x1   /* relocatable object file */
const MH_EXECUTE = 0x2  /* demand paged executable file */
const MH_FVMLIB = 0x3   /* fixed VM shared library file */
const MH_CORE = 0x4		/* core file */
const MH_PRELOAD = 0x5  /* preloaded executable file */
const MH_DYLIB = 0x6	/* dynamicly bound shared library file*/
const MH_DYLINKER = 0x7 /* dynamic link editor */
const MH_BUNDLE = 0x8   /* dynamicly bound bundle file */
const MH_DYLIB_STUB = 0x9  // Dynamic shared library stub
const MH_DSYM = 0xa  // Companion debug sections file
const MH_KEXT_BUNDLE = 0xb  // Kernel extension

/* Constants for the flags field of the mach_header */
const	MH_NOUNDEFS = 0x00000001		/* the object file has no undefined references, can be executed */
const	MH_INCRLINK = 0x00000002		/* the object file is the output of an incremental link against a base file and can't be link edited again */
const MH_DYLDLINK = 0x00000004		/* the object file is input for the dynamic linker and can't be staticly link edited again */
const MH_BINDATLOAD = 0x00000008		/* the object file's undefined references are bound by the dynamic linker when loaded. */
const MH_PREBOUND = 0x00000010		/* the file has it's dynamic undefined references prebound. */
const MH_SPLIT_SEGS = 0x00000020
const MH_LAZY_INIT = 0x00000040
const MH_TWOLEVEL = 0x00000080
const MH_FORCE_FLAT = 0x00000100
const MH_NOMULTIDEFS = 0x00000200
const MH_NOFIXPREBINDING = 0x00000400
const MH_PREBINDABLE = 0x00000800
const MH_ALLMODSBOUND = 0x00001000
const MH_SUBSECTIONS_VIA_SYMBOLS = 0x00002000
const MH_CANONICAL = 0x00004000
const MH_WEAK_DEFINES = 0x00008000
const MH_BINDS_TO_WEAK = 0x00010000
const MH_ALLOW_STACK_EXECUTION = 0x00020000
const MH_ROOT_SAFE = 0x00040000
const MH_SETUID_SAFE = 0x00080000
const MH_NO_REEXPORTED_DYLIBS = 0x00100000
const MH_PIE = 0x00200000
const MH_DEAD_STRIPPABLE_DYLIB = 0x00400000
const MH_HAS_TLV_DESCRIPTORS = 0x00800000
const MH_NO_HEAP_EXECUTION = 0x01000000
const MH_APP_EXTENSION_SAFE = 0x02000000

/* Constants for the cmd field of all load commands, the type */
const LC_SEGMENT = 0x00000001		   /* segment of this file to be mapped */
const LC_SYMTAB = 0x00000002		   /* link-edit stab symbol table info */
const LC_SYMSEG = 0x00000003		   /* link-edit gdb symbol table info (obsolete) */
const LC_THREAD = 0x00000004		   /* thread */
const LC_UNIXTHREAD = 0x00000005	  /* unix thread (includes a stack) */
const LC_LOADFVMLIB = 0x00000006	  /* load a specified fixed VM shared library */
const LC_IDFVMLIB = 0x00000007		   /* fixed VM shared library identification */
const LC_IDENT = 0x00000008		   /* object identification info (obsolete) */
const LC_FVMFILE = 0x00000009		   /* fixed VM file inclusion (internal use) */
const LC_PREPAGE = 0x0000000a		   /* prepage command (internal use) */
const LC_DYSYMTAB = 0x0000000b		   /* dynamic link-edit symbol table info */
const LC_LOAD_DYLIB = 0x0000000c	  /* load a dynamicly linked shared library */
const LC_ID_DYLIB = 0x0000000d		   /* dynamicly linked shared lib identification */
const LC_LOAD_DYLINKER = 0x0000000e   /* load a dynamic linker */
const LC_ID_DYLINKER = 0x0000000f	 /* dynamic linker identification */
const LC_PREBOUND_DYLIB = 0x00000010 /* modules prebound for a dynamicly */
const LC_ROUTINES = 0x00000011
const LC_SUB_FRAMEWORK = 0x00000012
const LC_SUB_UMBRELLA = 0x00000013
const LC_SUB_CLIENT = 0x00000014
const LC_SUB_LIBRARY = 0x00000015
const LC_TWOLEVEL_HINTS = 0x00000016
const LC_PREBIND_CKSUM = 0x00000017
const LC_LOAD_WEAK_DYLIB = 0x80000018
const LC_SEGMENT_64 = 0x00000019
const LC_ROUTINES_64 = 0x0000001A
const LC_UUID = 0x0000001B
const LC_RPATH = 0x8000001C
const LC_CODE_SIGNATURE = 0x0000001D
const LC_SEGMENT_SPLIT_INFO = 0x0000001E
const LC_REEXPORT_DYLIB = 0x8000001F
const LC_LAZY_LOAD_DYLIB = 0x00000020
const LC_ENCRYPTION_INFO = 0x00000021
const LC_DYLD_INFO = 0x00000022
const LC_DYLD_INFO_ONLY = 0x80000022
const LC_LOAD_UPWARD_DYLIB = 0x80000023
const LC_VERSION_MIN_MACOSX = 0x00000024
const LC_VERSION_MIN_IPHONEOS = 0x00000025
const LC_FUNCTION_STARTS = 0x00000026
const LC_DYLD_ENVIRONMENT = 0x00000027
const LC_MAIN = 0x80000028
const LC_DATA_IN_CODE = 0x00000029
const LC_SOURCE_VERSION = 0x0000002A
const LC_DYLIB_CODE_SIGN_DRS = 0x0000002B
const LC_ENCRYPTION_INFO_64 = 0x0000002C
const LC_LINKER_OPTION = 0x0000002D
const LC_LINKER_OPTIMIZATION_HINT = 0x0000002E
const LC_VERSION_MIN_TVOS = 0x0000002F
const LC_VERSION_MIN_WATCHOS = 0x00000030

/* Constants for the flags field of the segment_command */
const	SG_HIGHVM = 0x00000001 	/* the file contents for this segment is for the high part of the VM space, the low part is zero filled (for stacks in core files) */
const	SG_FVMLIB = 0x00000002 	/* this segment is the VM that is allocated by a fixed VM library, for overlap checking in the link editor */
const	SG_NORELOC = 0x00000004	/* this segment has nothing that was relocated in it and nothing relocated to it, that is it maybe safely replaced without relocation*/
const SG_PROTECTED_VERSION_1 = 0x00000008  // Segment is encryption protected


// Section flag masks
const SECTION_TYPE = 0x000000ff  // Section type mask
const SECTION_ATTRIBUTES = 0xffffff00  // Section attributes mask

// Section type (use SECTION_TYPE mask)
const S_REGULAR = 0x00
const S_ZEROFILL = 0x01
const S_CSTRING_LITERALS = 0x02
const S_4BYTE_LITERALS = 0x03
const S_8BYTE_LITERALS = 0x04
const S_LITERAL_POINTERS = 0x05
const S_NON_LAZY_SYMBOL_POINTERS = 0x06
const S_LAZY_SYMBOL_POINTERS = 0x07
const S_SYMBOL_STUBS = 0x08
const S_MOD_INIT_FUNC_POINTERS = 0x09
const S_MOD_TERM_FUNC_POINTERS = 0x0a
const S_COALESCED = 0x0b
const S_GB_ZEROFILL = 0x0c
const S_INTERPOSING = 0x0d
const S_16BYTE_LITERALS = 0x0e
const S_DTRACE_DOF = 0x0f
const S_LAZY_DYLIB_SYMBOL_POINTERS = 0x10
const S_THREAD_LOCAL_REGULAR = 0x11
const S_THREAD_LOCAL_ZEROFILL = 0x12
const S_THREAD_LOCAL_VARIABLES = 0x13
const S_THREAD_LOCAL_VARIABLE_POINTERS = 0x14
const S_THREAD_LOCAL_INIT_FUNCTION_POINTERS = 0x15

// Section attributes (use SECTION_ATTRIBUTES mask)

const S_ATTR_PURE_INSTRUCTIONS = 0x80000000  // Only pure instructions
const S_ATTR_NO_TOC = 0x40000000  // Contains coalesced symbols
const S_ATTR_STRIP_STATIC_SYMS = 0x20000000  // Can strip static symbols
const S_ATTR_NO_DEAD_STRIP = 0x10000000  // No dead stripping
const S_ATTR_LIVE_SUPPORT = 0x08000000  // Live blocks support
const S_ATTR_SELF_MODIFYING_CODE = 0x04000000  // Self modifying code
const S_ATTR_DEBUG = 0x02000000  // Debug section
const S_ATTR_SOME_INSTRUCTIONS = 0x00000400  // Some machine instructions
const S_ATTR_EXT_RELOC = 0x00000200  // Has external relocations
const S_ATTR_LOC_RELOC = 0x00000100  // Has local relocations

// Define structures in JavaScript

class FatHeader {
    constructor(magic, nfat_arch) {
        this.magic = magic >>> 0;
        this.nfat_arch = nfat_arch >>> 0;
    }
}

class FatArch {
    constructor(cputype, cpusubtype, offset, size, align) {
        this.cputype = cputype >>> 0;
        this.cpusubtype = cpusubtype >>> 0;
        this.offset = offset >>> 0;
        this.size = size >>> 0;
        this.align = align >>> 0;
    }
}

class MachHeader {
    constructor(magic, cputype, cpusubtype, filetype, ncmds, sizeofcmds, flags) {
        this.magic = magic >>> 0;
        this.cputype = cputype >>> 0;
        this.cpusubtype = cpusubtype >>> 0;
        this.filetype = filetype >>> 0;
        this.ncmds = ncmds >>> 0;
        this.sizeofcmds = sizeofcmds >>> 0;
        this.flags = flags >>> 0;
    }
}

class MachHeader64 {
    constructor(magic, cputype, cpusubtype, filetype, ncmds, sizeofcmds, flags, reserved) {
        this.magic = magic >>> 0;
        this.cputype = cputype >>> 0;
        this.cpusubtype = cpusubtype >>> 0;
        this.filetype = filetype >>> 0;
        this.ncmds = ncmds >>> 0;
        this.sizeofcmds = sizeofcmds >>> 0;
        this.flags = flags >>> 0;
        this.reserved = reserved >>> 0;
    }
}

class LoadCommand {
    constructor(cmd, cmdsize) {
        this.cmd = cmd >>> 0;
        this.cmdsize = cmdsize >>> 0;
    }
}

class UUIDCommand {
    constructor(cmd, cmdsize, uuid) {
        this.cmd = cmd;
        this.cmdsize = cmdsize;
        this.uuid = uuid;
    }

    static fromBuffer(buffer) {
        const cmd = buffer.readUInt32LE(0);
        const cmdsize = buffer.readUInt32LE(4);
        const uuid = Array.from(buffer.slice(8, 24));

        return new UUIDCommand(cmd, cmdsize, uuid);
    }

    toBuffer() {
        const buffer = Buffer.alloc(24);
        buffer.writeUInt32LE(this.cmd, 0);
        buffer.writeUInt32LE(this.cmdsize, 4);
        for (let i = 0; i < 16; i++) {
            buffer[8 + i] = this.uuid[i];
        }

        return buffer;
    }
}
  
class EntryPointCommand {
    constructor(cmd, cmdsize, entryoff, stacksize) {
        this.cmd = cmd;
        this.cmdsize = cmdsize;
        this.entryoff = entryoff;
        this.stacksize = stacksize;
    }

    static fromBuffer(buffer) {

        const cmd = buffer.readUInt32LE(0);
        const cmdsize = buffer.readUInt32LE(4);
        const entryoff = buffer.readBigUInt64LE(8);
        const stacksize = buffer.readBigUInt64LE(16);

        return new EntryPointCommand(cmd, cmdsize, entryoff, stacksize);
    }

    toBuffer() {

        const buffer = Buffer.alloc(24);
        buffer.writeUInt32LE(this.cmd, 0);
        buffer.writeUInt32LE(this.cmdsize, 4);
        buffer.writeBigUInt64LE(this.entryoff, 8);
        buffer.writeBigUInt64LE(this.stacksize, 16);

        return buffer;
    }
}

class CodeSignatureCommand {
    constructor(cmd, cmdsize, dataoff, datasize) {
        this.cmd = cmd;
        this.cmdsize = cmdsize;
        this.dataoff = dataoff;
        this.datasize = datasize;
    }

    static fromBuffer(buffer) {

        const cmd = buffer.readUInt32LE(0);
        const cmdsize = buffer.readUInt32LE(4);
        const dataoff = buffer.readUInt32LE(8);
        const datasize = buffer.readUInt32LE(12);

        return new CodeSignatureCommand(cmd, cmdsize, dataoff, datasize);
    }

    toBuffer() {

        const buffer = Buffer.alloc(16);
        buffer.writeUInt32LE(this.cmd, 0);
        buffer.writeUInt32LE(this.cmdsize, 4);
        buffer.writeUInt32LE(this.dataoff, 8);
        buffer.writeUInt32LE(this.datasize, 12);

        return buffer;
    }
}

class EncryptionInfoCommand {
    constructor(cmd, cmdsize, cryptoff, cryptsize, cryptid) {
        this.cmd = cmd;
        this.cmdsize = cmdsize;
        this.cryptoff = cryptoff;
        this.cryptsize = cryptsize;
        this.cryptid = cryptid;
    }

    static fromBuffer(buffer) {

        const cmd = buffer.readUInt32LE(0);
        const cmdsize = buffer.readUInt32LE(4);
        const cryptoff = buffer.readUInt32LE(8);
        const cryptsize = buffer.readUInt32LE(12);
        const cryptid = buffer.readUInt32LE(16);

        return new EncryptionInfoCommand(cmd, cmdsize, cryptoff, cryptsize, cryptid);
    }

    toBuffer() {

        const buffer = Buffer.alloc(20);
        buffer.writeUInt32LE(this.cmd, 0);
        buffer.writeUInt32LE(this.cmdsize, 4);
        buffer.writeUInt32LE(this.cryptoff, 8);
        buffer.writeUInt32LE(this.cryptsize, 12);
        buffer.writeUInt32LE(this.cryptid, 16);

        return buffer;
    }
}

class EncryptionInfoCommand64 {
    constructor(cmd, cmdsize, cryptoff, cryptsize, cryptid, pad) {
        this.cmd = cmd;
        this.cmdsize = cmdsize;
        this.cryptoff = cryptoff;
        this.cryptsize = cryptsize;
        this.cryptid = cryptid;
        this.pad = pad;
    }

    static fromBuffer(buffer) {

        const cmd = buffer.readUInt32LE(0);
        const cmdsize = buffer.readUInt32LE(4);
        const cryptoff = buffer.readUInt32LE(8);
        const cryptsize = buffer.readUInt32LE(12);
        const cryptid = buffer.readUInt32LE(16);
        const pad = buffer.readUInt32LE(20);

        return new EncryptionInfoCommand64(cmd, cmdsize, cryptoff, cryptsize, cryptid, pad);
    }

    toBuffer() {

        const buffer = Buffer.alloc(24);
        buffer.writeUInt32LE(this.cmd, 0);
        buffer.writeUInt32LE(this.cmdsize, 4);
        buffer.writeUInt32LE(this.cryptoff, 8);
        buffer.writeUInt32LE(this.cryptsize, 12);
        buffer.writeUInt32LE(this.cryptid, 16);
        buffer.writeUInt32LE(this.pad, 20);

        return buffer;
    }
}

class SegmentCommand {
    constructor(cmd, cmdsize, segname, vmaddr, vmsize, fileoff, filesize, maxprot, initprot, nsects, flags) {
        this.cmd = cmd;
        this.cmdsize = cmdsize;
        this.segname = segname;
        this.vmaddr = vmaddr;
        this.vmsize = vmsize;
        this.fileoff = fileoff;
        this.filesize = filesize;
        this.maxprot = maxprot;
        this.initprot = initprot;
        this.nsects = nsects;
        this.flags = flags;
    }

    static fromBuffer(buffer) {

        const cmd = buffer.readUInt32LE(0);
        const cmdsize = buffer.readUInt32LE(4);
        const segname = buffer.toString('utf8', 8, 24).replace(/\0/g, '');
        const vmaddr = buffer.readUInt32LE(24);
        const vmsize = buffer.readUInt32LE(28);
        const fileoff = buffer.readUInt32LE(32);
        const filesize = buffer.readUInt32LE(36);
        const maxprot = buffer.readUInt32LE(40);
        const initprot = buffer.readUInt32LE(44);
        const nsects = buffer.readUInt32LE(48);
        const flags = buffer.readUInt32LE(52);

        return new SegmentCommand(cmd, cmdsize, segname, vmaddr, vmsize, fileoff, filesize, maxprot, initprot, nsects, flags);
    }

    toBuffer() {

        const buffer = Buffer.alloc(56);
        buffer.writeUInt32LE(this.cmd, 0);
        buffer.writeUInt32LE(this.cmdsize, 4);
        buffer.write(this.segname.padEnd(16, '\0'), 8, 16, 'utf8'); 
        buffer.writeUInt32LE(this.vmaddr, 24);
        buffer.writeUInt32LE(this.vmsize, 28);
        buffer.writeUInt32LE(this.fileoff, 32);
        buffer.writeUInt32LE(this.filesize, 36);
        buffer.writeUInt32LE(this.maxprot, 40);
        buffer.writeUInt32LE(this.initprot, 44);
        buffer.writeUInt32LE(this.nsects, 48);
        buffer.writeUInt32LE(this.flags, 52);

        return buffer;
    }
}

class SegmentCommand64 {
    constructor(cmd, cmdsize, segname, vmaddr, vmsize, fileoff, filesize, maxprot, initprot, nsects, flags) {
        this.cmd = cmd;
        this.cmdsize = cmdsize;
        this.segname = segname;
        this.vmaddr = vmaddr;
        this.vmsize = vmsize;
        this.fileoff = fileoff;
        this.filesize = filesize;
        this.maxprot = maxprot;
        this.initprot = initprot;
        this.nsects = nsects;
        this.flags = flags;
    }

    static fromBuffer(buffer) {

        const cmd = buffer.readUInt32LE(0);
        const cmdsize = buffer.readUInt32LE(4);
        const segname = buffer.toString('utf8', 8, 24).replace(/\0/g, '');
        const vmaddr = buffer.readBigUInt64LE(24);
        const vmsize = buffer.readBigUInt64LE(32);
        const fileoff = buffer.readBigUInt64LE(40);
        const filesize = buffer.readBigUInt64LE(48);
        const maxprot = buffer.readUInt32LE(56);
        const initprot = buffer.readUInt32LE(60);
        const nsects = buffer.readUInt32LE(64);
        const flags = buffer.readUInt32LE(68);

        return new SegmentCommand64(cmd, cmdsize, segname, vmaddr, vmsize, fileoff, filesize, maxprot, initprot, nsects, flags);
    }

    toBuffer() {

        const buffer = Buffer.alloc(72);
        buffer.writeUInt32LE(this.cmd, 0);
        buffer.writeUInt32LE(this.cmdsize, 4);
        buffer.write(this.segname.padEnd(16, '\0'), 8, 16, 'utf8');
        buffer.writeBigUInt64LE(this.vmaddr, 24);
        buffer.writeBigUInt64LE(this.vmsize, 32);
        buffer.writeBigUInt64LE(this.fileoff, 40);
        buffer.writeBigUInt64LE(this.filesize, 48);
        buffer.writeUInt32LE(this.maxprot, 56);
        buffer.writeUInt32LE(this.initprot, 60);
        buffer.writeUInt32LE(this.nsects, 64);
        buffer.writeUInt32LE(this.flags, 68);

        return buffer;
    }
}

class Section {
    constructor(sectname, segname, addr, size, offset, align, reloff, nreloc, flags, reserved1, reserved2) {
        this.sectname = sectname;
        this.segname = segname;
        this.addr = addr;
        this.size = size;
        this.offset = offset;
        this.align = align;
        this.reloff = reloff;
        this.nreloc = nreloc;
        this.flags = flags;
        this.reserved1 = reserved1;
        this.reserved2 = reserved2;
    }

    static fromBuffer(buffer) {

        const sectname = buffer.toString('utf8', 0, 16).replace(/\0/g, '');
        const segname = buffer.toString('utf8', 16, 32).replace(/\0/g, '');
        const addr = buffer.readUInt32LE(32);
        const size = buffer.readUInt32LE(36);
        const offset = buffer.readUInt32LE(40);
        const align = buffer.readUInt32LE(44);
        const reloff = buffer.readUInt32LE(48);
        const nreloc = buffer.readUInt32LE(52);
        const flags = buffer.readUInt32LE(56);
        const reserved1 = buffer.readUInt32LE(60);
        const reserved2 = buffer.readUInt32LE(64);

        return new Section(sectname, segname, addr, size, offset, align, reloff, nreloc, flags, reserved1, reserved2);
    }

    toBuffer() {

        const buffer = Buffer.alloc(68);
        buffer.write(this.sectname.padEnd(16, '\0'), 0, 16, 'utf8');
        buffer.write(this.segname.padEnd(16, '\0'), 16, 16, 'utf8');
        buffer.writeUInt32LE(this.addr, 32);
        buffer.writeUInt32LE(this.size, 36);
        buffer.writeUInt32LE(this.offset, 40);
        buffer.writeUInt32LE(this.align, 44);
        buffer.writeUInt32LE(this.reloff, 48);
        buffer.writeUInt32LE(this.nreloc, 52);
        buffer.writeUInt32LE(this.flags, 56);
        buffer.writeUInt32LE(this.reserved1, 60);
        buffer.writeUInt32LE(this.reserved2, 64);

        return buffer;
    }
}

class Section64 {
    constructor(sectname, segname, addr, size, offset, align, reloff, nreloc, flags, reserved1, reserved2, reserved3) {
        this.sectname = sectname;
        this.segname = segname;
        this.addr = addr;
        this.size = size;
        this.offset = offset;
        this.align = align;
        this.reloff = reloff;
        this.nreloc = nreloc;
        this.flags = flags;
        this.reserved1 = reserved1;
        this.reserved2 = reserved2;
        this.reserved3 = reserved3;
    }

    static fromBuffer(buffer) {

        const sectname = buffer.toString('utf8', 0, 16).replace(/\0/g, '');
        const segname = buffer.toString('utf8', 16, 32).replace(/\0/g, '');
        const addr = buffer.readBigUInt64LE(32);
        const size = buffer.readBigUInt64LE(40);
        const offset = buffer.readUInt32LE(48);
        const align = buffer.readUInt32LE(52);
        const reloff = buffer.readUInt32LE(56);
        const nreloc = buffer.readUInt32LE(60);
        const flags = buffer.readUInt32LE(64);
        const reserved1 = buffer.readUInt32LE(68);
        const reserved2 = buffer.readUInt32LE(72);
        const reserved3 = buffer.readUInt32LE(76);

        return new Section64(sectname, segname, addr, size, offset, align, reloff, nreloc, flags, reserved1, reserved2, reserved3);
    }

    toBuffer() {

        const buffer = Buffer.alloc(80);
        buffer.write(this.sectname.padEnd(16, '\0'), 0, 16, 'utf8');
        buffer.write(this.segname.padEnd(16, '\0'), 16, 16, 'utf8');
        buffer.writeBigUInt64LE(this.addr, 32);
        buffer.writeBigUInt64LE(this.size, 40);
        buffer.writeUInt32LE(this.offset, 48);
        buffer.writeUInt32LE(this.align, 52);
        buffer.writeUInt32LE(this.reloff, 56);
        buffer.writeUInt32LE(this.nreloc, 60);
        buffer.writeUInt32LE(this.flags, 64);
        buffer.writeUInt32LE(this.reserved1, 68);
        buffer.writeUInt32LE(this.reserved2, 72);
        buffer.writeUInt32LE(this.reserved3, 76);

        return buffer;
    }
}

class LCStr {
    constructor(offset) {
        this.offset = offset;
    }

    static fromBuffer(buffer) {

        const offset = buffer.readUInt32LE(0);
        return new LCStr(offset);
    }

    toBuffer() {

        const buffer = Buffer.alloc(4);
        buffer.writeUInt32LE(this.offset, 0);
        return buffer;
    }

    getString(buffer) {


        const stringOffset = this.offset;
        let str = '';
        let char = buffer[stringOffset];
        while (char !== 0) {
            str += String.fromCharCode(char);
            char = buffer[++stringOffset];
        }
        return str;
    }
}

class Dylib {
    constructor(name, timestamp, currentVersion, compatibilityVersion) {
        this.name = name;
        this.timestamp = timestamp;
        this.currentVersion = currentVersion;
        this.compatibilityVersion = compatibilityVersion;
    }

    static fromBuffer(buffer, offset = 0) {
        const name = LCStr.fromBuffer(buffer, offset);
        const timestamp = buffer.readUInt32LE(offset + 4);
        const currentVersion = buffer.readUInt32LE(offset + 8);
        const compatibilityVersion = buffer.readUInt32LE(offset + 12);

        return new Dylib(name, timestamp, currentVersion, compatibilityVersion);
    }

    toBuffer() {
        const buffer = Buffer.alloc(16);
        buffer.writeUInt32LE(this.name.offset, 0);
        buffer.writeUInt32LE(this.timestamp, 4);
        buffer.writeUInt32LE(this.currentVersion, 8);
        buffer.writeUInt32LE(this.compatibilityVersion, 12);

        return buffer;
    }

    getName(buffer) {
        return this.name.getString(buffer);
    }
}

class DylibCommand {
    constructor(cmd, cmdsize, dylib) {
        this.cmd = cmd;
        this.cmdsize = cmdsize;
        this.dylib = dylib;
    }

    static fromBuffer(buffer, offset = 0) {
        const cmd = buffer.readUInt32LE(offset);
        const cmdsize = buffer.readUInt32LE(offset + 4);
        const dylib = Dylib.fromBuffer(buffer, offset + 8);

        return new DylibCommand(cmd, cmdsize, dylib);
    }

    toBuffer() {
        const buffer = Buffer.alloc(24);
        buffer.writeUInt32LE(this.cmd, 0);
        buffer.writeUInt32LE(this.cmdsize, 4);
        const dylibBuffer = this.dylib.toBuffer();
        dylibBuffer.copy(buffer, 8);

        return buffer;
    }

    getDylibName(buffer) {
        return this.dylib.getName(buffer);
    }
}