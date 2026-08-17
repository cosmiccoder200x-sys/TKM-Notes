// Official KTU syllabus text (module-wise topics only, textbooks stripped) per subject code.
// Source: extracted from the official curriculum PDF. Used to generate accurate
// "deep dive" prompts for any subject, including ones not yet written as full notes.
// Project/Seminar/Internship courses and MOOC-only courses without a dedicated
// detail page are intentionally excluded here — the prompt generator falls back
// to a generic-but-honest prompt for those rather than showing wrong content.

const syllabusText: Record<string, string> = {
  "24ERJ303": `SYLLABUS
 MODULE I: Number Systems and Logic Gate fundamentals
 Number Systems and Codes: Binary, Octal and hexadecimal conversions- ASCII code,
 Excess -3 code, Gray code, BCD, Error detection codes-Parity code. Signed numbers-
 representation, addition and subtraction, Fixed point and floating-point representation.
 TTL and CMOS logic families-Internal diagram of TTL NAND gate and CMOS NOR gate.
 MODULE II: Boolean Algebra and Combinational Circuits Design
 Boolean algebra - Sum of Products method, Product of Sum method – K map
 representation and simplification (up to four variables) - Pairs, Quads, Octets, Don’t
 care conditions.
 Combinational circuits: Adders -Full adder and half adder, Subtractors- half subtractor
 and full subtractor, 4 bit parallel binary adder/subtractor, Carry Look ahead adders.
 MODULE III: Digital Logic Components and Verilog Programming
 Comparators, Parity generators and checkers, Encoders, Decoders, , BCD to seven
 segment decoder, Code converters, Multiplexers, Demultiplexers, Architecture of
 Arithmetic Logic Units (Block schematic only).
 Verilog basic language elements: identifiers, data objects, scalar data types, operators.
 Entity and Architecture, Gate Level Modelling: Basic gates, testbench, XOR using NAND
 and NOR. Modeling combinational logic circuits in Verilog - Data Flow Modelling,
 Behavioral level Modeling: half adder, full adder, mux, demux, decoder, encoder.
 MODULE IV: Flip-Flops, Registers, and Counters: Sequential Logic Design
 Flip-Flops, SR, JK, D and T flip-flops, JK Master Slave Flip-flop, Preset and clear inputs,
 Conversion of flip-flops. Registers -SISO, SIPO, PISO, PIPO. Up/Down Counters:
 Asynchronous Counters – Modulus of a counter – Mod-N counters Ring counter,
 Johnson Counter Synchronous counters, Design of Synchronous counters.
Modeling of sequential logic circuits in Verilog: flipflops, counters.
 MODULE V: State Machines, D/A and A/D Converters, Programmable Logic
 Devices
 State Machines: State transition diagram, Moore and Mealy Machines Digital to Analog
 converter –Specifications, Weighted resistor type, R-2R Ladder type. Analog to Digital
 Converter – Specifications, Flash type, Successive approximation type. Programmable
 Logic Devices - PAL, PLA, FPGA, combinational logic design with PAL, PLA.`,
  "24ERJ404": `SYLLABUS
 MODULE I: h-parameter model of CE amplifier, Biasing of JFET and MOSFET
 amplifiers
 Review of BJT characteristics-Operating point of a BJT-Transistor Biasing circuits:
 Fixed bias, Collector to base bias, Voltage divider biasing-Derivation of stability factor
 for voltage divider biasing-h parameter model of BJT in CE configuration-small signal
 low frequency ac equivalent circuit of CE amplifier- Calculation of amplifier gains and
 impedances using h parameter equivalent circuit.
 Field Effect Transistors: Review of JFET and MOSFET (enhancement mode only) JFET
 and MOSFET common source amplifier-Design using voltage divider biasing.
 MODULE II : Frequency response of Amplifiers, Multistage amplifiers and Power
 amplifiers
 Frequency response of Amplifiers: Low and high frequency response of common emitter
 amplifier - Role of coupling capacitors and emitter bypass capacitor-Internal
 Capacitances at high frequency operations of BJT-Hybrid pi model of BJT-Gain
 bandwidth product.
 Multistage amplifiers: Direct, RC, transformer coupled Amplifiers, Applications.
 Power amplifiers using BJT: Class A, Class B, Class AB - Conversion
 efficiency derivation (Class A and Class B)-Distortion in power
 amplifiers.
 MODULE III : Feedback in amplifiers and basics of OPAMP
 Feedback in Amplifiers-Effect of positive and negative feedbacks.
 Oscillators: Barkhausen criterion–RC oscillators (RC Phase shift oscillator).
 Operational Amplifiers: Fundamental differential amplifier- Modes of operation.
 Properties of ideal and practical Op-amp - Gain, CMRR and Slew rate. Parameters of a
 typical Op-amp IC 741.

 MODULE IV : Operational amplifier circuits
 Open loop and Closed loop Configurations, Concept of virtual ground. Negative feedback
 in Op-amps. Inverting and non- inverting amplifier circuits. Summing and difference
 amplifiers, Instrumentation amplifier.
   OP-AMP Circuits: Differentiator and Integrator circuits-practical circuits –
 Design – Comparators: Zero crossing and voltage level detectors, Schmitt
 trigger. Comparator IC: LM311. Simulation examples using LTSpice

 MODULE V : Waveform generation and Introduction to CMOS
  Waveform generation using Op-Amps: Square, triangular and ramp generator circuits
  using Op-Amp- Effect of slew rate on waveform generation - Timer 555 IC-internal
  diagram- Astable and monostable multivibrators using 555 IC. Simulation examples
  using LTSpice
  Introduction to CMOS circuits- Advantages of CMOS – CMOS logic gates-
  CMOS NOR- Basics of CMOS opamp.`,
  "24ERJ502": `SYLLABUS
MODULE I: Introduction & Entity Relationship Model (4hrs)
Concept & Overview of Database Management Systems (DBMS) - Characteristics of
Database system, Database Users, structured, semi-structured and unstructured
data. Data Models and Schema - Three Schema architecture. Database Languages,
Database architectures, and classification.ER model - Basic concepts, entity set
and attributes, notations, Relationships and constraints, cardinality, participation,
notations, weak entities, relationships of degree 3.
MODULE II: Relational Model and SQL DDL (5hrs)
Structure of Relational Databases - Integrity Constraints, Synthesizing ER diagram
to relational schema. Introduction to Relational Algebra - select, project, cartesian
product operations, join - Equi-join, natural join. query examples, introduction to
Structured Query Language (SQL), SQL data types, Data Definition Language
(DDL), Table definitions and operations – CREATE, DROP, ALTER, INSERT,
DELETE, UPDATE.
MODULE III: SQL DML and Physical Data Organization (5hrs)
SQL DML (Data Manipulation Language) - SQL queries on single and multiple
tables, Nested queries (correlated and non-correlated), Aggregation and grouping,
Views, and Assertions. PL/SQL-Functions, Procedures, Triggers, and Cursors.
Physical Data Organization - Review of terms: physical and logical records, blocking
factor, pinned and unpinned organization. Heap files, Indexing, Singe level indices,
numerical examples, Multi-level indices, numerical examples, B- Trees & B+-Trees
(structure only, algorithms not required), Extendible Hashing.
MODULE IV: Database Normalization (4hrs)
Different anomalies in designing a database, The idea of normalization, Functional
dependency, Armstrong’s Axioms (proofs not required), Closures and their
computation, Equivalence of functional Dependencies (FD), and Minimal Cover
(proofs not required). First Normal Form (1NF), Second Normal Form (2NF), Third
Normal Form (3NF), Boyce Codd Normal Form (BCNF).
MODULE V: Transactions, Concurrency and Recovery, NoSQL, JDBC
(6hrs)
Transaction Processing Concepts - Overview of concurrency control, Transaction
Model, Significance of concurrency control and recovery, Transaction States,

System Log, and Desirable Properties of Transactions. Serial schedules, Concurrent
and Serializable Schedules, Conflict equivalence and conflict serializability,
Recoverable and cascade-less schedules, Locking, Two-phase locking, and its
variations. Log-based recovery, Deferred database modification, check-pointing.

Introduction to NoSQL Databases, Main characteristics of Key-value DB (examples
from Redis), Document DB (examples from MongoDB) Main characteristics of
Column-Family DB (examples from Cassandra), and Graph DB (examples from:
Arango DB)
Java Database Connectivity (JDBC) - JDBC overview, Creating and Executing
Queries – create table, delete, insert, select.`,
  "24ERP304": `SYLLABUS
 MODULEI: Basic Concepts of Data Structures
 Introduction: Overview of Data Structures – The Need for Data Structures – Cost and
 Benefits – Abstract Data Types and Data Structures. Basic complexity analysis – Best,
 Worst, and Average Cases – Asymptotic Analysis -Analyzing Programs – Space Bounds,
 Complexity Calculation of Simple Algorithms.
 MODULEII: Arrays and Linked List
 Array - Stacks, Queues-Circular Queues, Double Ended Queues, Evaluation of
 Expressions. Linked List - Self Referential Structures, Dynamic Memory Allocation,
 Singly Linked List-Operations on Linked List. Doubly Linked List, Circular Linked List,
 Stacks and Queues using Linked List. Applications of array and linked list -, Polynomial
 representation.
 MODULEIII: Trees and Graphs
 Trees -Binary Trees - Binary Tree Representation, Tree Traversals, Binary Search Trees-
 Binary Search Tree Operations. Graphs, Representation of Graphs, Depth First Search
 and Breadth First Search on Graphs, Applications of Graphs.
 MODULE IV: Sorting and searching
 Sorting – Linear Sorting – Heap Sort – Merge Sort – Quick Sort –External Memory
 Sorting. Searching - Linear Search, Binary Search, Complexity analysis.
 MODULEV: Hashing Table and Tries
 Map ADT - Hash Tables and implementation of Map using Hash Tables - Design of hash
 functions - Collision resolution schemes: chaining, open addressing schemes - linear
 probing, quadratic probing, double hashing. Applications of Hashing: finding
 duplicates, set intersection. Tries: implementation of Map ADT using tries.`,
  "24ERP403": `SYLLABUS
 MODULE I: DC Machines
 DC Machines - principle of operation - emf equation - types of excitations - separately
 excited, shunt and series excited DC generators, compound generators. General idea of
 armature reaction, OCC and load characteristics.
 Principles of dc motors - torque and speed equations. Principles of starting, losses and
 efficiency.
 MODULE II: Transformers
 Transformers – principles of operations – emf equation- vector diagrams - losses and
 efficiency – OC and SC tests. Equivalent circuits- efficiency calculations- maximum
 efficiency – all day efficiency – simple numerical problems. Auto transformers -
 instrument transformers.
 MODULE III: Induction Machines
 Three phase induction motors- slip ring and squirrel cage types- principles of operation
 – rotating magnetic field- torque slip characteristics- no load and blocked rotor tests.
 Circle diagrams- methods of starting – direct online – auto transformer – star delta and
 rotor resistance starting.
 MODULE IV: Synchronous Machines
 Synchronous machines - types – emf equation of alternator – regulation of alternator
 by emf method. Principles of operation of synchronous motors - methods of starting- V
 curves- synchronous condenser.
 MODULE V: Single Phase Motor and Special Electrical Machines
 Single phase motors - principle of operation of single-phase induction motor – split
 phase motor – capacitor start motor- stepper motor- universal motor – switched
 reluctance motor.`,
  "24ERP407": `SYLLABUS
 MODULE I: Introduction
Introduction       to   Procedure     Oriented     and     Object     Oriented    Design    concepts
Introduction to Java – Java programming Environment and Runtime Environment,
Development                Platforms,               Java              program               structure
Fundamentals of Classes and Objects.
 MODULE II: Core Java Fundamentals
Review of variables, Data types and Literals, Control Statements - Selection Statements,
Iteration Statements and Jump Statements.

Operators in Java Iteration Statements and Jump Statements. Type Conversion and
Casting, Arrays, Strings,
 MODULE III: Object Creation and Inheritance
Object     Creation,    Object   Reference,      Introduction    to    Methods,    Access    Control
Constructors, Inheritance – single level inheritance, multilevel inheritance, hierarchical
inheritance, Keyword super and final.
 MODULE IV: Polymorphism and Interface
Polymorphism – Compile time polymorphism and Runtime polymorphism, Abstract class
and methods, Interfaces.
 MODULE V: Exception Handling and Multithreading
Exception handling- Checked Exceptions, Unchecked Exceptions, Exception Handling
Keywords.
Multithreaded programming– The Java Thread Model, The Main Thread, Creating
Thread, Suspending, Resuming and Stopping Threads.`,
  "24ERP504": `SYLLABUS

MODULE I: Introduction to Operating Systems
Introduction to Operating Systems: Virtualizing the CPU, Virtualizing the memory,
Concurrency, Persistence, Design Goals. Components of an OS, Types of OS, Operating System
structure - Simple structure, Layered approach, Microkernel, Modules, Generalized view of
System Calls, System boot process.

MODULE II: Process Management
Process Abstraction-Process, Process Creation, Process states, Process control block and
Context Switch, Process control system calls -fork, wait, exec, getpid, getppid and variants. The
limited direct execution model. Process Scheduling- Basic concepts, Scheduling queues,
Schedulers, Scheduling algorithms- First come First Served, Shortest Job First, Priority
scheduling, Round robin scheduling, Inter-process communication - shared memory systems,
Message passing systems.

MODULE III: Process Synchronization and Deadlocks
Concurrency - Threads, Single threaded and multithreaded programming, Thread API, Process
Synchronization – critical-section problem, Synchronization hardware, Mutex locks,
Semaphores, Critical regions, Monitors. Deadlock – System model, Deadlock characterization,
Methods for handling deadlocks, Deadlock prevention, Deadlock avoidance, Detection, Recovery

MODULE IV: Memory Management
. Address spaces, Memory view of a process -heap, stack, code, data Review of malloc and free
system calls. Address Translation – Introduction to Dynamic Relocation Hardware Support.
Segmentation, Free space Management, Paging, Virtual Memory – Demand Paging, Page
Replacement Algorithms, Allocation, Thrashing.

MODULE V: File and Storage Management
File System: File concept - Attributes, Operations, types, structure – Access methods,
Protection. File system implementation, Directory implementation. Allocation methods. Storage
Management: Magnetic disks, Solid-state disks, Disk Structure, Disk scheduling, Disk
formatting.`,
  "24ERP601": `SYLLABUS
 MODULE I: Introduction to Data Communication and Internet
 Introduction to Data Communication - Modes of communication, Physical
 topologies, Signal encoding, Multiplexing, Transmission media overview.
 Performance indicators – Bandwidth, Throughput, Latency, Queuing time,
 Bandwidth–Delay product. Basics of Internet, The Network Edge, The Network
 Core, Protocol layers and their service models - The OSI reference model, The
 TCP/IP reference model.
 MODULE II: Application Layer
 Principles of network applications, The Web and the HTTP, Electronic mail,
 Multipurpose Internet Mail Extension (MIME), File Transfer Protocol (FTP), Domain
 Name System (DNS), Simple Network Management Protocol. Peer-to-peer
 applications - P2P file distribution. Video streaming and Content Distribution
 Networks.
 MODULE III: Transport Layer
 Introduction and Transport Layer services, Multiplexing and Demultiplexing, UDP,
 Principles of Reliable Data transfer – Go-Back-N and Selective Repeat, TCP,
 Principles of Congestion Control, TCP Congestion control.
 MODULE IV: Network Layer
 Overview, Router, IPv4 and Addressing, Network Address Translation, IPv6, Routing
 Algorithms – Link state and Distance Vector Routing, Open Shortest Path First
 Protocol (OSPF), Border Gateway Protocol (BGP), Internet Control Message Protocol
 (ICMP), Address Resolution Protocol (ARP), Reverse Address Resolution Protocol
 (RARP), Bootstrap Protocol (BOOTP), Dynamic Host Configuration Protocol (DHCP).
 MODULE V: Data link layer
 Services provided by DLL, Error Detection and Correction Techniques, Sliding
 window protocols, High-Level Data Link Control (HDLC) protocol. Medium Access
 Control (MAC) sublayer – Channel allocation problem, Multiple access protocols,
 Ethernet, Wireless LANs - 802.11, Repeaters, Hubs, Bridges, Switches, Routers and
 Gateways.`,
  "24ERP602": `SYLLABUS

 MODULE I: Introduction to Embedded Systems & 8051 Microcontroller

 Embedded     systems-    Application      domain,      features        and   general
 characteristics, Architecture of Embedded system. Basic architecture of a
 microprocessor. Microprocessor versus microcontroller. 8051 Microcontroller:
 Architecture, PSW, memory organization, special function registers, IO
 ports, Addressing modes.

 MODULE II: 8051 Microcontroller Instruction Set and Programming
 Instruction set- Data transfer, Arithmetic, Logical, Branching – SJMP, AJMP,
 LJMP – Basic ALPs. Embedded C Programming – Declaring variables, Example
 programs in ALP and C.

 MODULE III: Advanced Programming and I/O Interfacing
 Time delay and I/O port programming :- Timer/Counter – registers and timer
 modes, Timer/Counter Programming, Serial port programming using
 8051.Communication protocols: USART, SPI, I2C and CAN. Interfacing of I/O
 devices - seven segment LED, LCD, ADC and DAC.

 MODULE IV: Introduction to Advanced Micro Controllers and IoT
 Introduction to ARM7 Micro Controller, comparison between RISC and CISC,
 ARM7 architecture and flag register. Definition and characteristics of
 Internet of Things (IoT), Physical Design of IoT, Overview of IoT Architecture,
 Logical design of IoT, IoT Communication Models: Request-Response, Publish-
 Subscribe, Push-Pull and Exclusive Pair, Applications of IoT.

 MODULE V: Design of Embedded Systems and IoT
 IoT Communication Networks and Protocols: MQTT, COAP protocols, BLE, Wi-Fi,
 LORA, 3G/4G Technologies.
 Design of Embedded Systems – Home Automation – Smart Agriculture –
 Smart Cities – Smart Healthcare (Projects).`,
  "24ERP701": `SYLLABUS
 MODULE I: Basics of Digital Image Processing
 Image sensing and acquisition – simple image formation model
 Types of images-Basic concepts in Sampling and Quantization, Spatial and
 intensity Resolution, Image interpolation
 Basic relationship between pixels of an image-Adjacency, regions and boundaries,
 Distance measures. Mathematical tools used in digital image processing: Linear
 versus nonlinear operations, Arithmetic operations, set and logical operations,
 Spatial operations
 MODULE II: Image Transforms
 Spatial Domain transforms: Basic intensity transformation functions: image
 negatives and log transformation, Histogram processing- histogram
 equalisation. Fundamentals of Spatial Filtering: Spatial correlation and
 convolution, Smoothing filters and Sharpening filters: Average and Laplacian
 filters
 MODULE III: Frequency Domain transforms
 Filtering in the frequency Domain: The Discrete Fourier Transform-properties
 Image smoothing using frequency Domain filters: ideal lowpass filters,
 Butterworth lowpass filters and Gaussian lowpass filters. Image sharpening
 using frequency Domain filters: ideal highpass filters, Color Models: RGB model-
 CMY and CMYK models- HIS          Color System- Y Cb Cr color model-

 MODULE IV: Image segmentation
 Image segmentation – Classification of Image segmentation techniques, region
 approach, clustering techniques. Image segmentation based on Thresholding.
 Classification of edges, edge detection. Hough transforms.
 Object recognition: Introduction, Approaches to Object recognition.
 Case study: Finger print recognition and Face recognition
 MODULE V: Pattern Recognition and Stereovision
 Recent Advances in Pattern Recognition-Neural network structures for pattern
 recognition. Convolutional Neural Networks (CNN), Different layers and
 functionalities, data augmentation, Cost function,Training, parameters and
 hyper-parameters, Regularization (Case study)
  Stereovision: Image formation in stereo vision setup (Epipolar geometry)- Image
  reconstruction from a series of projections- Radon Transform`,
  "24ERP702": `SYLLABUS

MODULE I: Power System Network Modelling
Structure and evolution of electric power systems, conventional and alternate
energy sources. Transmission Line parameters: resistance, inductance,
capacitance. Transmission line modelling: classifications, ABCD parameters of
medium line - Numerical problems.

MODULE II: Short Circuit Analysis
Single line diagram, impedance and reactance diagram, per unit calculations -
Short circuit analysis - importance, assumptions, types of faults. Symmetrical 3-
phase balanced faults - calculation of fault currents. Symmetrical components -
Un-symmetrical faults - LG, LL, LLG (manual calculation limited to 3 bus).

MODULE III: Load Flow Analysis
Power flow analysis: Importance in planning and operation of power systems.
Statement of power flow problem, classification of buses, network model
formulation - formation of bus admittance matrix, Gauss-Seidel (two iterations)
and Newton-Raphson (Qualitative analysis only).

MODULE IV: Automatic Generation Control
Concept of power system stability - Classifications - Steady state, transient, dynamic
stability (Concept only). Automatic generation and voltage control: introduction to
load frequency control, turbine speed governing system, model of speed governing
system - turbine, generator and load models, load frequency control block diagram -
single area and two area systems, Automatic Voltage Regulator.

MODULE V: Economics of Power Generation
Economic aspects of power generation: load curve, load duration and integrated
load duration curves, load demand, diversity, capacity, utilization and plant use
factors. Statement of economic dispatch problem - cost of generation, incremental
cost curve, coordination equations without loss, solution by direct method.
Numerical problems.`,
  "24ERT305": `SYLLABUS
 MODULE I: Introduction to measurements and sensors
 Instruments: Classifications, applications, essentials of indicating instruments –
 deflecting, damping, controlling torques, elements of a generalized measurement
 system, -errors in measurement.
 Introduction to sensors, Need of sensors in the modern world, Overview of
 Sensors- Sensor fundamentals, characteristics, classification, performance and
 error analysis
 MODULE II: Temperature and flow sensor
Temperature sensors- thermos-resistive, thermoelectric-simple numerical problems,
Piezoelectric temperature sensor. Flow sensors: pressure gradient technique, thermal
transport, ultrasonic, electromagnetic and Laser anemometer. coriolis mass flow sensor.
  MODULE III: Optical sensors and Biomedical Sensors
 Electronic and Optical properties of semiconductor as sensors, LED, Semiconductor
 lasers, Fiber optic sensors, Photo multipliers, photoconductive detectors, Charge
 Coupled devices (CCDs), CMOS sensors.
 Biomedical sensors – EEG, ECG, EMG.
 MODULE IV: Position, Direction, Displacement sensor
 Potentiometric and capacitive sensors, LVDT – simple numerical problems, RVDT, Hall
 effect sensor. Operational Amplifiers-characteristics (slew rate, CMRR). Switched
 capacitor amplifier, Practical designing of a capacitor measurement circuit.
 MODULE V: Signal conditioning
 Analog and Digital Signal Conditioning - Principles of analog signal conditioning, Signal-
 Level and Bias Changes, Linearization, Conversions, Hardware and Software of Data
 Acquisition System (DAS)`,
  "24ERT401": `SYLLABUS
 MODULE I: Basic Structure of Computers
 Basic Structure of Computers- functional units--Von-Neumann architecture- basic
 operational concepts, Introduction to buses, single bus and multiple bus organization.
 Representation of Instructions: Instruction formats -Operands- Addressing modes.
 Processor Unit: Fundamental Concepts- single bus and Multiple bus organization of
 CPU, instruction cycle.
 MODULE II: Processor and Control Unit
 Control Unit: Memory read and memory write operations - Data transfer using registers.
 Hardwired Control, Micro programmed Control, Execution of a complete instruction -
 sequencing of control signals. Horizontal and vertical micro instructions. Instruction set
 architectures - CISC and RISC architectures
 MODULE III: Data representation
 Data representation: Signed number representation, fixed and floating-point
 representations, character representation. Computer Arithmetic: Integer Addition and
 Subtraction - Array Multiplier, Booths Multiplication- Division- non- restoring and
 restoring techniques.
 MODULE IV: Memory Organization
 Memory Organization: - Memory cells- Basic Organization. Memory hierarchy –
 Content addressable memory, Caches – Cache performance - Virtual memory –
 Common framework for memory hierarchies.
 Introduction to Pipelining- classification of pipeline processors, instruction and
 Arithmetic pipelines (Design examples not required), Pipeline Hazards
 MODULE V: Input/output organisation
 Input/output organisation- Characteristics of I/O devices, Data transfer schemes -
 Programmed controlled I/O transfer, Interrupt controlled I/O transfer. Organization of
 interrupts - vectored interrupts – Servicing of multiple input/output devices –Polling and
 daisy chaining schemes. Direct memory accessing (DMA). Modern
 Processors.`,
  "24ERT402": `SYLLABUS
 MODULE I: Introduction to Signals and Systems

Introduction to signals and systems -Elementary signals – unit step, unit ramp, unit impulse
- properties, real and complex exponentials, sinusoidal.
Classification of signals – Continuous Time and Discrete Time, Even and Odd, Causal and
Noncausal, Periodic and Aperiodic, Power and Energy, Deterministic and Random signals.
Basic operations on signals – reversal, shifting, scaling (both time and amplitude).
Concept of system - Properties of systems - linearity, time invariance, causality, memory
stability, invertibility – Numerical problems.
Use simulation platforms (MATLAB / Scilab) to demonstrate elementary signals and it
operations (HomeWorks / Assignments only).
 MODULE II: Convolution and Laplace Transform Analysis
 Convolution integral – Analytical method. Representation of LTI systems - Impulse
response representation – Differential    equation representations of LTI systems.
Overview of Laplace Transform - Laplace transform analysis of systems – Relation between th
transfer function and differential equation.
Determining the time domain response from transfer function – Numerical problems on
electrical networks.
Use simulation platforms (MATLAB / Scilab) to obtain time domain response from transfe
function. (HomeWorks / Assignments only).
 MODULE III: Fourier Representation and Sampling of Signals.
Fourier representation of continuous time signals – Fourier Series – Harmonic analysis of
common signals
Fourier transform – Existence – properties of FT, Frequency response of LTI systems
Sampling process- sampling theorem– Aliasing – Nyquist rate.
Signal reconstruction- Zero order and First order hold circuits.
Use simulation platforms (MATLAB / Scilab) to obtain Fourier Series / Transform of
common signals. (HomeWorks / Assignments only).
 MODULE IV: Discrete domain representation of signals and systems.
Difference equation representations of LTI systems - Discrete forms of representing
systems – Direct form I and II, Cascade, Parallel forms.
Fourier representation of discrete time signals - Discrete Fourier series – properties.
Discrete time Fourier Transform – properties of DTFT. Frequency response of Discrete
Time systems.
Use simulation platforms (MATLAB / Scilab) to obtain Discrete Fourier Series /
Transform of common signals. (HomeWorks / Assignments only).
MODULE V: Discrete Convolution and Z Transform Analysis
 Discrete convolution- methods and its properties.
  Z Transform - Region of convergence- Properties of the Z transform, Inverse ZT –Long
division, Partial Fraction methods.
Z-transfer function- Analysis of difference equation of LTI systems – Mapping of Laplace-
domain to Z-domain.
Use simulation platforms (MATLAB / Scilab) to analyze discrete systems using Z-
transform. (HomeWorks / Assignments only).`,
  "24ERT501": `SYLLABUS
MODULE I: Modelling of Physical Systems
 Introduction to open loop and closed loop control systems – Real time applications of open
 loop (e.g. Traffic light controller, Fan regulator, automatic coffee maker) and closed loop
 systems (e.g. Water level control, Air conditioning system, Launch vehicle attitude control).
 Comparison of open loop and closed loop systems.
 Transfer function of physical systems- Electrical, Mechanical, Electromechanical systems
 - Force voltage and Force current analogy - Block diagram representation - block diagram
 reduction – Signal flow graph – Mason’s gain formula.
 MODULE II: Time Domain Analysis
 Time domain analysis of control systems: Time domain specifications of transient and
 steady state responses- Impulse and Step responses of first and second order systems.
 Stability Analysis: Characteristic Equation - Poles and zeros - Concept of BIBO stability
 and Asymptotic stability- Time response for various pole locations- stability of feedback
 systems - Routh's stability criterion- Relative stability.
 MODULE III: Root Locus Construction and Compensator Design
 Root locus technique: Construction of Root locus- stability analysis- effect of addition of
 poles and zeroes.
 Design of Compensators: Design of lag, lead and lag-lead compensators using Root locus
 technique.
 PID controllers: PID tuning using Ziegler- Nichols methods.
 MODULE IV: Frequency Domain Analysis
 Frequency domain specifications- correlation between time domain and frequency domain
 responses
 Bode Plot: Construction- Concepts of gain margin and phase margin- stability analysis.
 Polar plot: Concepts of gain margin and phase margin- stability analysis.
 MODULE V: Compensator Design in Frequency Domain
 Nyquist criterion: Nyquist plot- Stability criterion- Analysis.
 Compensator design using Bode plot: Design of lag, lead and lag-lead compensator using
 Bode plot. State space model, Solution of state equations of LTI systems.`,
  "24ERT503": `SYLLABUS

MODULE I: Fundamentals to probabilistic reasoning in AI
Bayes' Theorem, Random variables -Discrete and continuous random variables.
Probability density function, Distribution function, Mean and Variance. Probability
distribution- normal distribution.

MODULE II: Introduction to AI
Introduction – Foundations and applications of AI. Intelligent Agents – Structure of
Agents, Agents and Environments, Case study- Vacuum Cleaner Problem.

MODULE III: Problem Solving
Uninformed search strategies-BFS, DFS, iterative DFS, uniform cost search. Informed search
strategies -Best First Search, A* search algorithms, Case study- 8 Puzzle problem, N Queen
Problem.

MODULE IV: Introduction to neural networks
Machine learning paradigms-supervised, semi-supervised, unsupervised, reinforcement
learning. Introduction to neural network: Concept of perceptron and Artificial neuron, Weight
initialization techniques, Feed Forward Neural Network, Back Propagation algorithm.

CASE STUDY: Implementing neural networks algorithms using python

MODULE V: Machine Learning
Supervised learning- Linear Regression, Support Vector Machine, Optimal Separating hyper
plane, Kernel functions. Bayes Rule, Naive Bayes Model, Classifier performance measures,
ROC Curves. Unsupervised learning: Introduction to Clustering.
CASE STUDY: Implementing machine learning algorithms using python`,
  "24ERT507": `SYLLABUS
MODULE I: Introduction to Software Engineering

 Introduction to Software Engineering - Professional software development, Software
 engineering ethics. Software Life Cycle Models- The waterfall model - Agile model- Spiral
 Model: Phases of Spiral model.

MODULE II: Requirement analysis, Planning and Design

 Planning phase – project planning objective, software scope, empirical estimation
 models- COCOMO, single variable model, staffing and personal planning.

 Design phase – design process, principles, concepts, effective modular design-Top down,
 Bottom-up strategies, stepwise refinement.

Module III: Implementation and Testing

 Design Engineering: Design process and design quality, design concepts, the design
 model. Creating an architectural design: software architecture, data design, architectural
 styles and patterns, architectural design, conceptual model of UML.

 Testing Strategies: A strategic approach to software testing, test strategies for
 conventional software, black-box and white-box testing, validation testing, system
 testing, the art of debugging.

  Case studies: An insulin pump control system Mentcare- a patient information system
 for mental health care.

MODULE IV: Maintenance and Project Scheduling

Maintenance-Overview of maintenance process, types of maintenance. Risk management:
software risks - risk identification-risk monitoring and management. Project
Management concept: People – Product-Process-Project.

Project scheduling and tracking: Basic concepts-relation between people and effort-
 defining task set for the software project-selecting software engineering task.
 Case study: Project planning using JIRA software

MODULEV: Software Quality, Process Improvement and Technology trend

Software Quality, Management system, Achieving Software Quality Elements of Software
 Quality Assurance, SQA Tasks, Software measurement and metrics. Software Process
 Improvement (SPI), SPI Process CMMI process improvement framework, ISO 9001:2000
 for Software. Cloud-based Software - Virtualization and containers, Everything as a
 service (IaaS, PaaS), Software as a service.`,
  "24ERT603": `SYLLABUS
MODULE I: Power semiconductor devices
 Introduction to Power Electronics-Scope and applications-power electronics vs
 signal electronics- Structure and principle of operation of power devices- Power
 diode, Power MOSFET & IGBT – switching characteristics - comparison. Basic
 principles of wideband gap devices SiC, GaN - SCR- Structure, Static
 characteristics & Switching (turn-on & turn-off) characteristics - di/dt& dv/dt
 protection – Turn-on methods of SCR - Two transistor analogy- Gate triggering
 circuits – Requirements of isolation and synchronization in gate drive circuits-
 Opto and pulse transformer based isolation
 MODULE II: Line commutated converters
 Controlled Rectifiers (Single Phase) – Half-wave controlled rectifier with R load–
 Fully controlled and half controlled bridge rectifier with R, RL and RLE loads
 (continuous & discontinuous conduction) – Output voltage equation- related
 simple problems- Controlled Rectifiers (3-Phase) - 3-phase half-wave controlled
 rectifier with R load – Fully controlled & half-controlled bridge converter with RLE
 load (continuous conduction, ripple free) – Output voltage equation-Waveforms for
 various triggering angles (detailed mathematical analysis not required)
 MODULE III: AC Voltage Controllers and Inverters
 AC voltage controllers (ACVC) – 1-phase full-wave ACVC with R, & RL loads –
 Waveforms – RMS output voltage, Input power factor with R load- Inverters –
 Voltage Source Inverters– 1-phase half-bridge & full bridge inverter with R and RL
 loads – THD in output voltage – 3-phase bridge inverter with R load – 120° and
 180° conduction modes–Voltage control in 1-phase inverters – Pulse width
 modulation – Single pulse width, Multiple pulse width and Sine-triangle PWM
 (unipolar & bipolar modulation) – Modulation Index - Frequency modulation ratio.
 MODULE IV: DC-DC Converters
 DC-DC converters – Step down and Step up choppers – Single-quadrant, Two-
 quadrant and Four quadrant chopper – Pulse width modulation & current limit
 control in dc-dc converters- Switching regulators – Buck, Boost & Buck-boost –
 Operation with continuous conduction mode – Waveforms – Design of Power
 circuits (switch selection, filter inductance and capacitance)
 MODULE V: Power Electronic Control of Electric Drives
 Electric Drive: Introduction to electric drives – Block diagram – advantages of
 electric drives- types of load – classification of load torque- DC Drives: Single phase
 semi converter and single phase fully controlled converter drives. Chopper
 controlled DC drives- Single quadrant chopper drives- Regenerative braking
 control- Two quadrant chopper drives- Four quadrant chopper drives- AC Drives:
 Three phase induction motor speed control. Stator voltage control – stator
 frequency control - Stator voltage and frequency control (V/f).`,
  "24ESP307": `SYLLABUS
MODULE I: Introduction to Electrical Circuit Simulation
Overview of system simulation-Importance of system simulation- Advantages and
disadvantages of simulation-Types of simulation problems-DC simulation-Transient
Simulation-AC simulation-Digital Circuit Simulation-Sensitivity analysis- noise analysis.
Examples.
MODULE II: Introduction to MATLAB
Introduction to MATLAB, Variables, arrays, conditional statements, loops, functions, m-
files, plots and various Toolbox familiarization. Solution of ordinary differential equations-
ODE Solvers
MODULE III: Creating subsystems using MATLAB/SIMULINK
Introduction To MATLAB SIMULINK– Importance-SIMULINK Interface- Libraries & Tools-
Sources & Sinks-Building Systems-Mathematical Modeling-Converting Mathematical Model
into SIMULINK Model. Realtime Modeling exercises using Simulink.
MODULE IV: Electronic Instrumentation
Basics of digital measurements: A/D and D/A Converters-Instrumentation amplifier-
comparators and function generators-elements of digital multimeter-Hall effect sensor-clamp
on meter-solid state energy meter-frequency, phase angle and time period measurement-
Digital Storage Oscilloscope-Sample and Hold circuits
MODULE V: Introduction to Virtual Instrumentation
Introduction to virtual instrumentation- Virtual instrumentation tools -Building virtual
instruments for data acquisition and control, arrays, clusters, graphs, charts, programming
techniques, string operation, data logging. Data acquisition methods-DAQ hardware, PC
hardware; Structure, Operating system, ISA, PCI, USB, PCMICA buses, Instrumentation
buses. IEEE 488.1`,
  "24ESP608": `SYLLABUS
MODULE I: Introduction to Cyber-Physical Systems

 Cyber-Physical Systems (CPS) in the real world, Basic principles of design and
  validation of CPS, Industry 4.0, IIOT implications, Building Automation,
  Architecture of a generic Medical cyber physical system- Integrated clinical
  environment, medical device coordination framework, smart clinical decision
  support system.

 MODULE II:CPS – Environment

 Hardware   platforms  for    Cyber     Physical   Systems:    Sensors/Actuators,
 Microprocessor/Microcontrollers, Wireless Technologies for Cyber Physical Systems

 Module III: CPS modeling and Control

 Introduction to Modeling of cyber-physical systems- Continuous-time model,
  discrete time models, finite state machines, Hybrid Automata- with real time
  examples, Time series models- Auto Regressive model, ARMA. Dynamical system
  modeling, stability, controller design.

 Delay-aware Design; Platform effect on Stability/Performance.

 MODULE IV: CPS Engineering

 Concurrent Models of computation, Low level Control, Mid High-Level Control and
  Automation, From features to software components, Mapping software components
  to ECUs, CPS Performance Analysis - effect of scheduling, bus latency, Sensor and
  actuation faults on control performance, network congestion

 MODULE V: CPS Security

 Information and Cyber Security basics, Privacy in CPS, Threats to CPS in various
  domains such as Automotive, Medical, Industrial control etc. CPS Attack models

 Local Network Security for CPSs, Internet-Wide Secure Communication, Security
  and Privacy for Cloud-Interconnected CPSs, Case Study: secured CPS`,
  "24EST332": `SYLLABUS
 MODULE I: Steady state analysis using circuit theorems
 Steady state analysis of AC and DC circuits with dependent and independent sources;
 Source transformation; Superposition, Thevenin’s, Norton’s, and Maximum Power
 Transfer theorems; Problems from DC circuits only.
 MODULE II: Transient analysis of circuits in s – domain
 Review of Laplace Transform. Transformation of a circuit into s-domain. Transform
 impedance of passive circuit elements - R, L and C.
 Transient Analysis: Formulation and solution of dynamic equations of RL and RC series
 networks with DC excitation and initial conditions using Laplace Transforms, Time
 constant; Complete solution of RL and RC series circuits with sinusoidal excitation using
 Laplace Transforms. Simple Numerical Problems.
 MODULE III: Resonance in series circuits and analysis of transformed circuits
 Resonance in Series circuits – Quality factor – Bandwidth – Simple Numerical Problems
 Steady state Analysis: Mesh analysis and node analysis of transformed circuits in -domain.
 Numerical Problems
 MODULE IV: Steady state analysis of three phase network
 Complex Power in sinusoidal steady state, Steady state analysis of - three-phase three-
 wire and four-wire unbalanced Y circuits, Unbalanced Delta circuit, Neutral shift. Complex
 Power
 MODULE V: Two port networks
 Two-port network parameters - Z, Y, h and T parameter, Conditions for symmetry &
 reciprocity.`,
  "24HUT310": `SYLLABUS
                      MODULE 1 (FOUNDATION OF LIFE SKILLS)
Understanding Life Skills: Meaning and Significance of Life Skills-WHO-Identified Life Skills-
Life skills for professionals
Self-awareness: Definition and Need-Tools and Techniques of Self-awareness
Stress Management: Stress, reasons and effects- stress diaries- Four A's of stress
management
Coping with emotions: Identifying and managing emotions- PATH method and relaxation
techniques
(Group activities for self awareness and stress management)
    MODULE 2 (21ST CENTURY SKILLS AND PROBLEM-SOLVING TECHNIQUES)
21st Century Skills: Creativity, Critical Thinking, Collaboration, Problem Solving, Decision
Making- Lateral Thinking- Critical thinking Vs Creative thinking
Problem Solving Techniques: Six Thinking Hats- Mind Mapping- Forced Connections-
Scientific temperament and Logical thinking with case studies. (Activity based learning)

                   MODULE 3 (GROUP DYNAMICS AND LEADERSHIP)
Group and Team Dynamics: Composition, Formation-Problem Solving in Groups-Group vs
Team, Team Dynamics- Managing team performance(Activity based learning)
Leadership: Leadership Framework -Types of Leadership- VUCA Leadership- Transactional
vs Transformational Leaders
                                MODULE 4 (HUMAN VALUES)
Morals, values and Ethics – Integrity- Academic integrity-Work Ethics- Service Learning- Civic
Virtue- Respect for others- Living peacefully- Caring and Sharing- Honestly- courage-
Cooperation commitment- Empathy-Self Confidence -Social Expectations.
Case study on Civil Engineering disasters (Include study of Ethical issues in a recent disaster)
Code of Conduct in Engineering profession.
                      MODULE 5 (RESPONSIBILITIES & RIGHTS)
Collegiality and loyalty – Managing conflict- Respect for authority- Collective bargaining-
Confidentiality-Role of confidentiality in moral integrity-Conflicts of interest- Occupational
crime- Professional rights-Employee right- IPR Discrimination
Global ethical issues- Business ethics, Computer Ethics, Environment ethics – Role in
technological development-Engineers as Managers- Consulting Engineers- Engineers as
Expert witnesses and advisors.`,
  "24HUT435": `SYLLABUS
MODULE I
Engineering and Economics- Definition and scope of engineering economics-Basic
concepts in economics- Scarcity and choice- Production possibility technique - Firms and
its objectives-types of firms- Utility- Law of diminishing marginal utility-Demand and its
determinants-Law of demand - Elasticity of demand-measurement of elasticity and its
applications –supply-Law of supply and determinants of supply- Equilibrium- changes
in demand and supply and its effects- Consumer surplus and producer surplus
(concepts)- Taxation and deadweight loss.
MODULE II
Production function- Law of variable proportion- economies of scale – internal and external
economies- Cost concepts- Social cost, private cost and external cost-Explicit cost and
implicit cost-sunk cost-short run cost curves-long run cost curves-cost function-Revenue
concepts- Shutdown point- Break even Analysis- problems.
MODULE III
Business forecasting- Elementary techniques- Social responsibility of business- Business
financing- Sources of capital- Capital and Money market-International financing- Foreign
direct investment- Foreign portfolio investment- Foreign Institutional investment. Basic
principles of taxation- direct tax- indirect tax- GST- tax evasion.
MODULE IV

Indian economy brief overview of Post- Independence period- plans. Post reform growth –
structure of productive activity- issues of inclusion.
Circular flow of income-two sector and multi-sector model- National income- Three sectors
of an economy- Methods of measuring national income-problems. Inflation- causes and
effects-measures to control inflation-monetary methods-credit control methods, SLR, CRR,
Open
market operation-Repo and Reverse repo- Fiscal policies.
MODULE V

Economics and the Environment- Environment and development- Basic issues- The cost
of economic growth and environmental degradation- sustainable policy approach-
population growth and environmental linkages- policy measures.
International Trade- Balance of payment- Components - Balance of payments deficit and
devaluation. India’s external debt- measures to reduce external debt- Developing country
borrowing and debt- capital inflows to developing countries- The problem of default.`,
  "24HUT535": `SYLLABUS

MODULE I: Fundamental concepts of Project Management
Fundamental concepts of Project Management - Concept of a project, importance and
difficulties, classification of projects, importance of project management, project
management vs. general management, the project life cycle, Project Identification and
Formulation, Project feasibility Analysis.

MODULE II: Project Scheduling
Project Scheduling - PERT concepts and uses of PERT, Probability of completion, PERT
and CPM techniques, Estimates - time, cost, resources (man, material, tool), Crashing of
Projects, Project scheduling with constrained resources, resource leveling, resource
allocation.

MODULE III: MS Project
MS Project - Introduction to MS Project, Work Breakdown Structure (WBS),
preparation of Gantt Chart, Critical Path Method (CPM) and Scheduling, Project control
and monitoring.

MODULE IV: Primavera Software
Primavera software - Introduction to Project Management and Primavera, Project Setup
and Configuration, Creating a Work Breakdown Structure (WBS), Project Scheduling
in Primavera, Critical Path Method (CPM) and Schedule Optimization.

MODULE V: Finance Management
Finance Management - Cost of the Project, Means of Finance, Financial Evaluation of
projects - Payback period method, Accounting Rate of Return method, Net Present Value
method, Internal Rate of Return method, Benefit Cost Ratio method, etc., Simple
Problems.`,
  "24MAP301": `SYLLABUS
 MODULE I: (Vector space)
(Text 1: Relevant topics from sections 2.1, 2.2, 2.3, 2.4, 2.5)
Vector Spaces, Subspaces -Definition and Examples. Linear independence of vectors, Linear
span, Basis and dimension, Co-ordinate representation of vectors, Row space and Column
space
 MODULE II: (Inner Product)
(Text 1: Relevant topics from sections 5.1, 5.2, 5.5)
Inner Product: Inner product spaces, properties of inner product, length and distance,
Orthogonality, Cauchy-Schwarz inequality, Orthogonal projection, orthogonal complement,
Orthonormal basis, Gram-Schmidt orthogonalization process.
 MODULE III: (Complex differentiation)
(Text 2: Relevant topics from sections 13.3,13.4)
Circles and disks half-planes, complex functions, limit, continuity and derivatives, analytic
functions, Cauchy-Riemann equations, Laplace equation, Harmonic functions, harmonic
conjugate functions
 MODULE IV: (Complex Integration)
(Text 2- Relevant topics from sections 14.1,14.2,14.3,14.4,15.4,16.1,16.2,16.3)
  Cauchy’s integral theorem for simply connected domains (without proof), Cauchy’s
  Integral formula for simply connected domains (without proof), Cauchy’s Integral
  formula for derivatives of analytic functions, Taylor and Maclaurin series, Laurent's
  series, Poles and Residues, Evaluation of residues, Cauchy's residue theorem.
 MODULE V: (Partial Differential Equations)
(Text 3: Relevant topics from sections 17.1,17.2,17.3,17.4,17.5)
  Introduction, Formation of partial differential equations -elimination of arbitrary
  constants-elimination of arbitrary functions, Solutions of partial differential equations,
  Equations solvable by direct integration, Linear equations of the first order, Lagrange's
  linear equation.`,
  "24MCT406": `SYLLABUS
 MODULE I (Environment and Ecosystem)
 Introduction- Definition and scope of environmental science - Interdisciplinary nature
 of the field.
 Ecosystem structure and function- Biodiversity and its importance - Threats to
 biodiversity (habitat loss, invasive species, overexploitation) - Man and Environment –
 Health and Environment – Environmental Ethics.
 Sustainable development – Social, economic and environmental dimensions- Need for
 Sustainable development, Sustainable Development Goals (SDGs)

   MODULE II (Air and Noise pollution)
 Air pollutants – classification, sources and impacts - Clean air act and national ambient
 air quality standards (NAAQS) - Air quality index - Emission reduction strategies -
 Understanding and controlling indoor air pollution.
 Ground level ozone and photochemical smog - Ozone layer depletion and the Montreal
 Protocol, Global warming
 Noise Pollution: Sources and effects of noise; quantification of noise pollution (Leq,
 LAeq, etc.); Control and regulation rules in India
   MODULE III (Water and Wastewater)
 Sources and availability of freshwater- Water conservation strategies - Water pollution
 and its impacts – Water Quality Standards (IS 10500) - Water quality index; Overview
 of water treatment plant- Sustainable water use and conflicts over water resources.
 Wastewater sources and quality –wastewater disposal – Oxygen sag curve - Applicable
 wastewater discharge standards and typical flow schemes for sewage treatment plant –
 Decentralized wastewater treatment- natural methods of wastewater treatment

   MODULE IV (Solid and Hazardous Waste Management)
 Waste Management: Consumerism and our throw-away culture; Characteristics of
 municipal solid waste; CPHEEO guidelines for solid waste management (overview only);
 Waste disposal methods (landfill, incineration, recycling) Sustainable practices in waste
 management - Transition to zero waste lifestyle – Circular Economy
 Hazardous and e-waste identification and management - Recycling and waste-to- energy
 technologies – regulations for hazardous waste management in India
 (overview only); Biomedical waste and its management

 MODULE V (Climate Action)
 Climate Change: Evidence, causes and effects, Carbon footprint, Global warming
 potential; Role of IPCC in the understanding of climate change; Global climate
 agreements – The United Nations Framework Convention on Climate Change, the Kyoto
 Protocol, and the Paris Agreement
 Mitigation strategies – carbon capture, utilization, and storage; adapting to climate
 change.
 Renewable Energy- solar energy, Biomass, Wind energy, New Energy sources`,
  "24CSJ303": `SYLLABUS
 MODULE I: Basics of Object-Oriented concepts and Java (5 hrs)
 Approaches to Software Design - Functional Oriented Design, Object Oriented Design,
 Case Study of Payroll Program. Object-Oriented concepts. Object Modeling using
 Unified Modeling Language (UML) - Static and Dynamic models, UML diagrams- Use
 case diagram, Class diagram.
 Introduction to Java- JRE, JDK, JVM, Program Structure, Primitive Data types, Arrays,
 Command-Line Arguments, Type conversions and promotion, Garbage collection.
 MODULE II: Fundamentals of Core Java (5 hrs)
 Classes and Objects. Constructors. Object class in Java. Use of static, this and final
 keywords. Method Overloading. Objects as Parameters to Methods. Access modifiers
 and Packages, Strings- Class and Methods, String Buffer and String Tokenizer.
 Reading Input from Console Using Scanner class.
 MODULE III: Inheritance, Polymorphism (5 hrs)
 Inheritance - Basics and Types, super keyword, calling superclass constructor from
 child class constructor, Method Overriding, using final with inheritance. Abstract
 Classes and methods. Interface- Basics, Multiple inheritance through interfaces,
 interface inheritance.
 MODULE IV: Collection Framework and Exception Handling (5 hrs)
 Collection Framework- concepts, Collection Interfaces and their Methods, List
 interface, Collections Class - Array List, Vector, Linked List. Accessing a Collection
 via an Iterator. Exception handling: Exception Basics and Types, try, catch, throw,
 throws, finally keywords, User defined exceptions.
 MODULE V: Event Handling and GUI Programming (4 hrs)
 Delegation Event Model, Event Classes, Listener Interfaces, Introduction to Java's
 Swing Package, Components, Containers and Layouts, Exploring Swings - JFrame,
 JPanel, JLabel, JTextField, JTextArea, JButton, JToggleButton, Check Boxes, Radio
 Buttons, JScrollPane, JMenu, JMenuBar and JMenuItem, Designing Frames and
 Adding GUI Components, Event Handling in Swings, Swing vs JavaFX`,
};

export default syllabusText;