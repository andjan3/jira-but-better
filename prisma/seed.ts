/* import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting to seed task orders...");

  // 1. Hämta alla kolumner med tasks som har order=0
  const columns = await prisma.column.findMany({
    include: {
      tasks: {
        where: { order: 0 },
        orderBy: { id: "asc" }, // Sortera för konsekvent ordning
      },
    },
    orderBy: { id: "asc" },
  });

  let totalUpdated = 0;

  // 2. Uppdatera order för varje task
  for (const column of columns) {
    console.log(
      `Updating ${column.tasks.length} tasks in column ${column.id}...`
    );

    const updates = column.tasks.map((task, index) =>
      prisma.task.update({
        where: { id: task.id },
        data: { order: index },
      })
    );

    const results = await Promise.all(updates);
    totalUpdated += results.length;
  }

  console.log(`Successfully updated order for ${totalUpdated} tasks`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding completed successfully");
  })
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
 */

/*   import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting to update task orders...");

 
  const columns = await prisma.column.findMany({
    include: {
      tasks: {
        where: { order: 0 },
        orderBy: { id: "asc" },
      },
    },
    orderBy: { id: "asc" },
  });

  let totalUpdated = 0;

  
  for (const column of columns) {
    console.log(`Updating ${column.tasks.length} tasks in column ${column.id}...`);

   
    const updates = column.tasks.map((task, index) => {
      const updatedOrder = index; 
      if (task.order !== updatedOrder) {
        return prisma.task.update({
          where: { id: task.id },
          data: { order: updatedOrder }, 
        });
      }

      
      return null;
    }).filter(Boolean); 
    const results = await Promise.all(updates);
    totalUpdated += results.length; 
  }

  console.log(`Successfully updated order for ${totalUpdated} tasks`);

 
  console.log("Task order update completed successfully");
}


main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding completed successfully");
  })
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
 */
