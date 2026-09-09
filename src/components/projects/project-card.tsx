"use client";

import { motion } from "framer-motion";

import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectMedia } from "@/components/projects/project-media";
import { StatusBadge } from "@/components/projects/status-badge";
import { TechChip } from "@/components/projects/tech-chip";
import { getTransition } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { CaseStudyProject } from "@/types/project";

interface ProjectCardProps {
  project: CaseStudyProject;
  index: number;
}

const directionVariants = {
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  bottom: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
} as const;
const directionOrder = ["left", "right", "bottom"] as const;

export function ProjectCard({ project, index }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = getTransition(prefersReducedMotion);

  const direction = directionOrder[index % directionOrder.length] ?? "bottom";

  return (
    <motion.article
      variants={directionVariants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={transition}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      className="flex flex-col items-start rounded-xl border border-border p-5 transition-colors duration-fast hover:border-border-hover"
    >
      <ProjectMedia
        image={project.image}
        video={project.video}
        alt={`${project.name} screenshot`}
        placeholderLabel={project.imagePlaceholderLabel}
      />

      <div className="mt-5 flex items-center gap-3">
        <h4 className="text-subheading font-semibold">{project.name}</h4>
        <StatusBadge status={project.status} />
      </div>

      <p className="mt-2 text-body-sm text-muted-foreground">{project.solution}</p>

      <p className="mt-3 text-caption text-muted-foreground/70">
        <span className="font-semibold text-foreground/60">Learned: </span>
        {project.learned}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 3).map((item) => (
          <TechChip key={item} label={item} />
        ))}
      </div>

      <div className="mt-5">
        <ProjectLinks links={project.links} />
      </div>
    </motion.article>
  );
}